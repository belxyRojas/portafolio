'use client'

import * as THREE from 'three'
import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { motionStore } from '@/lib/motion-store'

/* ------------------------------------------------------------------ *
 * 1. Adaptador del motionStore
 *    Único punto a tocar si tu store expone otra API.
 *    Soporta: zustand (getState), hook-function, u objeto plano.
 * ------------------------------------------------------------------ */
export type MotionState = {
  heroProgress: number
  mouseX: number
  mouseY: number
  reducedMotion: boolean
}

function readMotion(): MotionState {
  return {
    heroProgress: motionStore.heroProgress,
    mouseX: motionStore.mouseX,
    mouseY: motionStore.mouseY,
    reducedMotion: motionStore.reducedMotion,
  }
}

/* ------------------------------------------------------------------ *
 * 2. Paleta
 * ------------------------------------------------------------------ */
const VIOLET = '#7A3BFF'
const PINK = '#FF3B7A'
const LIME = '#CEFF1A'
const SECURITY = '#3D7CFF'
const EMISSIVE_DARK = new THREE.Color(VIOLET)
const EMISSIVE_LIGHT = new THREE.Color(PINK)
const LAYER_COLORS = [
  new THREE.Color(VIOLET),
  new THREE.Color(LIME),
  new THREE.Color(PINK),
  new THREE.Color(SECURITY),
]
const _layerOut = new THREE.Color()

type Theme = 'dark' | 'light'

/* ------------------------------------------------------------------ *
 * 3. Environment procedural (reemplaza al HDR)
 *    Pinta un equirect 256x128 en canvas 2D y lo pasa por PMREM.
 *    Coste: ~1ms, 0 bytes de red, disponible en el frame 1.
 * ------------------------------------------------------------------ */
function blob(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  rgb: string,
  a: number,
) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, `rgba(${rgb},${a})`)
  g.addColorStop(0.55, `rgba(${rgb},${a * 0.35})`)
  g.addColorStop(1, `rgba(${rgb},0)`)
  ctx.fillStyle = g
  ctx.fillRect(x - r, y - r, r * 2, r * 2)
}

function makeEnvCanvas(theme: Theme) {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 128
  const ctx = c.getContext('2d')!

  const dark = theme === 'dark'

  // base
  ctx.fillStyle = dark ? '#07090a' : '#c9cfcb'
  ctx.fillRect(0, 0, 256, 128)

  ctx.globalCompositeOperation = 'lighter'

  // key luminoso arriba-izquierda (da el "cromo" y el highlight duro)
  blob(ctx, 72, 10, 78, '255,255,255', dark ? 0.48 : 0.7)
  // fill superior suave
  blob(ctx, 180, 4, 90, '255,255,255', dark ? 0.16 : 0.38)
  // rim violeta lateral izquierdo
  blob(ctx, 24, 66, 78, '122,59,255', dark ? 0.55 : 0.28)
  // rim rosa lateral derecho
  blob(ctx, 214, 58, 72, '255,59,122', dark ? 0.48 : 0.22)
  // acento lima, pequeño y bajo (solo aparece en reflejos, nunca tiñe todo)
  blob(ctx, 148, 112, 34, '206,255,26', dark ? 0.16 : 0.1)
  // streak especular horizontal: es lo que hace que el vidrio "corra"
  blob(ctx, 196, 92, 40, '255,255,255', dark ? 0.18 : 0.32)

  ctx.globalCompositeOperation = 'source-over'
  return c
}

function useProceduralEnv(theme: Theme) {
  const gl = useThree((s) => s.gl)
  const scene = useThree((s) => s.scene)

  useEffect(() => {
    let rt: THREE.WebGLRenderTarget | null = null
    try {
      const canvas = makeEnvCanvas(theme)
      const tex = new THREE.CanvasTexture(canvas)
      tex.mapping = THREE.EquirectangularReflectionMapping
      tex.colorSpace = THREE.SRGBColorSpace

      const pmrem = new THREE.PMREMGenerator(gl)
      rt = pmrem.fromEquirectangular(tex)
      tex.dispose()
      pmrem.dispose()
      gl.setRenderTarget(null)

      scene.environment = rt.texture
      scene.environmentIntensity = theme === 'dark' ? 0.72 : 0.55
    } catch {
      scene.environment = null
    }

    return () => {
      if (rt && scene.environment === rt.texture) scene.environment = null
      rt?.dispose()
    }
  }, [gl, scene, theme])
}

/* ------------------------------------------------------------------ *
 * 4. Texturas utilitarias (glow de orbes + sombra falsa)
 * ------------------------------------------------------------------ */
function makeRadialTexture(inner: string, outer: string, size = 64) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, inner)
  g.addColorStop(0.4, outer)
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

/* ------------------------------------------------------------------ *
 * 5. Órbitas + orbes
 * ------------------------------------------------------------------ */
function Orbit({
  radius,
  tilt,
  color,
  speed,
  orbColor,
  orbSize,
  opacity,
  reduced,
  glowTex,
}: {
  radius: number
  tilt: [number, number, number]
  color: string
  speed: number
  orbColor: string
  orbSize: number
  opacity: number
  reduced: boolean
  glowTex: THREE.Texture
}) {
  const ref = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    if (!ref.current) return
    const dt = Math.min(delta, 1 / 30)
    const slowed = readMotion().reducedMotion
    ref.current.rotation.z += dt * speed * (slowed ? 0.15 : 1)
  })

  return (
    <group rotation={tilt}>
      <group ref={ref}>
        {/* anillo fino */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.0045, 3, 128]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
        {/* orbe sólido */}
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[orbSize, 16, 16]} />
          <meshBasicMaterial color={orbColor} toneMapped={false} />
        </mesh>
        {/* halo del orbe (sustituye al bloom) */}
        <sprite position={[radius, 0, 0]} scale={[orbSize * 12, orbSize * 12, 1]}>
          <spriteMaterial
            map={glowTex}
            color={orbColor}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            opacity={0.55}
            toneMapped={false}
          />
        </sprite>
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ *
 * 6. Escena
 * ------------------------------------------------------------------ */
export function KnotScene({
  lite = false,
  theme = 'dark',
}: {
  lite?: boolean
  theme?: Theme
}) {
  const dark = theme === 'dark'
  useProceduralEnv(theme)

  const group = useRef<THREE.Group>(null!)
  const knot = useRef<THREE.Mesh>(null!)
  const glow = useRef<THREE.Mesh>(null!)
  const violetLight = useRef<THREE.PointLight>(null!)
  const pinkLight = useRef<THREE.PointLight>(null!)

  const spin = useRef(0)
  const yaw = useRef(0)
  const pitch = useRef(0)

  const viewport = useThree((s) => s.viewport)

  /* --- Composición: nudo a la derecha; en móvil más chico y más abajo --- */
  const { offsetX, offsetY, scale } = useMemo(() => {
    const aspect = viewport.width / viewport.height
    const narrow = aspect < 0.85
    const compact = aspect < 1.15
    const s = THREE.MathUtils.clamp(viewport.width / 8.6, 0.52, 1)
    return {
      offsetX: narrow ? viewport.width * 0.08 : 0,
      offsetY: narrow ? viewport.height * 0.02 : compact ? viewport.height * 0.06 : 0,
      scale: narrow ? s * 0.7 : compact ? s * 0.82 : s,
    }
  }, [viewport.width, viewport.height])

  /* --- Geometría: p=2, q=3 (trébol). Ver nota al final del archivo. --- */
  const knotGeo = useMemo(
    () => new THREE.TorusKnotGeometry(1, 0.32, lite ? 128 : 256, lite ? 20 : 36, 2, 3),
    [lite],
  )
  useEffect(() => () => knotGeo.dispose(), [knotGeo])

  const glowTex = useMemo(
    () => makeRadialTexture('rgba(255,255,255,1)', 'rgba(255,255,255,0.35)'),
    [],
  )
  const shadowTex = useMemo(
    () => makeRadialTexture('rgba(0,0,0,0.85)', 'rgba(0,0,0,0.35)', 128),
    [],
  )
  useEffect(
    () => () => {
      glowTex.dispose()
      shadowTex.dispose()
    },
    [glowTex, shadowTex],
  )

  /* --- Loop: todo aquí dentro. Cero setState, cero re-render en scroll. --- */
  useFrame((_, delta) => {
    const dt = Math.min(delta, 1 / 30)
    const m = readMotion()
    const p = THREE.MathUtils.clamp(m.heroProgress ?? 0, 0, 1)
    const reduced = !!m.reducedMotion
    const mx = m.mouseX ?? 0
    const my = m.mouseY ?? 0

    // rotación propia (se frena al hacer scroll)
    spin.current += dt * (reduced ? 0.03 : 0.2) * (1 - p * 0.6)

    // tilt de mouse amortiguado
    const tYaw = reduced ? 0 : mx * 0.42
    const tPitch = (reduced ? 0 : my * 0.26) + p * 0.45
    yaw.current = THREE.MathUtils.damp(yaw.current, tYaw, 3.5, dt)
    pitch.current = THREE.MathUtils.damp(pitch.current, tPitch, 3.5, dt)

    const g = group.current
    const knotMesh = knot.current
    const glowMesh = glow.current
    const vLight = violetLight.current
    const pLight = pinkLight.current
    if (!g || !knotMesh || !glowMesh || !vLight || !pLight) return

    g.rotation.y = spin.current + yaw.current
    g.rotation.x = pitch.current
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, yaw.current * 0.25, 3, dt)

    // se aleja y baja un poco al hacer scroll
    g.position.y = THREE.MathUtils.damp(g.position.y, offsetY - p * 0.55, 4, dt)
    g.position.z = THREE.MathUtils.damp(g.position.z, -p * 1.1, 4, dt)

    // material: glow interior y emissive suben con el scroll
    const mat = knotMesh.material as THREE.MeshPhysicalMaterial
    mat.emissiveIntensity = THREE.MathUtils.damp(
      mat.emissiveIntensity,
      dark ? 0.22 + p * 0.35 : 0.1 + p * 0.16,
      4,
      dt,
    )
    mat.iridescence = THREE.MathUtils.damp(
      mat.iridescence,
      dark ? 0.4 + p * 0.2 : 0.25,
      4,
      dt,
    )

    const gm = glowMesh.material as THREE.MeshBasicMaterial
    gm.opacity = THREE.MathUtils.damp(gm.opacity, dark ? 0.08 + p * 0.08 : 0.04, 4, dt)

    const layerT = p * 3
    const i0 = Math.min(3, Math.floor(layerT))
    const i1 = Math.min(3, i0 + 1)
    _layerOut.copy(LAYER_COLORS[i0]).lerp(LAYER_COLORS[i1], layerT - i0)
    mat.emissive.copy(_layerOut)
    gm.color.copy(_layerOut)

    // las luces de rim siguen el mouse: mueve el reflejo, no el mesh
    vLight.position.x = THREE.MathUtils.damp(
      vLight.position.x,
      -3 + mx * 0.9,
      3,
      dt,
    )
    vLight.position.y = THREE.MathUtils.damp(
      vLight.position.y,
      1.4 - my * 0.9,
      3,
      dt,
    )
    pLight.position.x = THREE.MathUtils.damp(
      pLight.position.x,
      3.2 + mx * 0.9,
      3,
      dt,
    )
  })

  return (
    <group position={[offsetX, offsetY, 0]} scale={scale}>
      <group ref={group}>
        {/* Nudo: vidrio/cromo oscuro */}
        <mesh ref={knot} geometry={knotGeo} castShadow={false} receiveShadow={false}>
          <meshPhysicalMaterial
            color={dark ? '#161918' : '#E9EDE7'}
            metalness={dark ? 0.82 : 0.48}
            roughness={dark ? 0.22 : 0.28}
            clearcoat={1}
            clearcoatRoughness={dark ? 0.12 : 0.2}
            iridescence={dark ? 0.4 : 0.25}
            iridescenceIOR={1.35}
            iridescenceThicknessRange={[120, 420]}
            envMapIntensity={dark ? 0.85 : 0.7}
            emissive={dark ? EMISSIVE_DARK : EMISSIVE_LIGHT}
            emissiveIntensity={dark ? 0.22 : 0.1}
            reflectivity={0.5}
          />
        </mesh>

        {/* Cáscara aditiva = glow interior sin EffectComposer */}
        <mesh ref={glow} geometry={knotGeo} scale={1.035}>
          <meshBasicMaterial
            color={dark ? VIOLET : PINK}
            transparent
            opacity={dark ? 0.08 : 0.04}
            side={THREE.BackSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Órbitas + orbes (el lima vive aquí, no en el mesh) */}
      <Orbit
        radius={1.95}
        tilt={[Math.PI * 0.42, 0.25, 0]}
        color={VIOLET}
        orbColor={LIME}
        orbSize={0.032}
        speed={0.42}
        opacity={0.4}
        reduced={readMotion().reducedMotion}
        glowTex={glowTex}
      />
      <Orbit
        radius={2.45}
        tilt={[Math.PI * 0.6, -0.4, 0.3]}
        color={PINK}
        orbColor={PINK}
        orbSize={0.026}
        speed={-0.28}
        opacity={0.3}
        reduced={readMotion().reducedMotion}
        glowTex={glowTex}
      />
      {!lite && (
        <Orbit
          radius={2.2}
          tilt={[Math.PI * 0.5, 0.9, -0.2]}
          color={VIOLET}
          orbColor={VIOLET}
          orbSize={0.022}
          speed={0.6}
          opacity={0.22}
          reduced={readMotion().reducedMotion}
          glowTex={glowTex}
        />
      )}

      {/* Sombra de contacto falsa: un plano con gradiente. 0 render passes. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.85, 0]}>
        <planeGeometry args={[5.5, 5.5]} />
        <meshBasicMaterial
          map={shadowTex}
          transparent
          opacity={dark ? 0.35 : 0.28}
          depthWrite={false}
          color="#000000"
        />
      </mesh>

      {/* Luces locales: el nudo ya se ve aunque el env no existiera */}
      <ambientLight intensity={dark ? 0.28 : 0.7} />
      <directionalLight position={[2.5, 4, 3]} intensity={dark ? 1.05 : 1.25} color="#ffffff" />
      <pointLight
        ref={violetLight}
        position={[-3, 1.4, 1.2]}
        intensity={dark ? 4.2 : 2.2}
        distance={14}
        decay={2}
        color={VIOLET}
      />
      <pointLight
        ref={pinkLight}
        position={[3.2, -1.2, 1.6]}
        intensity={dark ? 3.6 : 1.8}
        distance={14}
        decay={2}
        color={PINK}
      />
      {/* Toque lima: bajo, débil, solo para el rim inferior */}
      <pointLight
        position={[0.4, -2.4, 1.8]}
        intensity={dark ? 1.4 : 0.7}
        distance={8}
        decay={2}
        color={LIME}
      />
    </group>
  )
}

export default KnotScene

/* ------------------------------------------------------------------ *
 * Nota sobre p/q:
 * Mantengo p=2, q=3 (trébol). Con tube 0.32 y 256 segmentos los tres
 * lóbulos quedan gruesos y legibles a 400px, y es la silueta que ya
 * reconoce quien vio el sitio. (3,4) entrelaza más — lee mejor la
 * metáfora de "cuatro capas" — pero a este tamaño los cruces se
 * empastan y pierdes el highlight especular que da el look de vidrio.
 * Si lo quieres: cambia args a (1, 0.26, 320, 40, 3, 4) y baja tube,
 * si no se convierte en bola.
 * ------------------------------------------------------------------ */
