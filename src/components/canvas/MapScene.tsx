import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import type { Beat, DistributorNode } from '../../types/scene';

type MapSceneProps = {
  currentBeat: Beat | null;
};

// Procedural distributor setup
const generateDistributors = (): DistributorNode[] => {
  const count = 12;
  const radius = 5;
  return Array.from({ length: count }).map((_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    return {
      id: `dist_${i + 1}`,
      label: `D${i + 1}`,
      position: [x, 0, z],
      routeSelected: i === 3 // Highlight 4th route as the common route
    };
  });
};

// Sub-component to manage smooth camera transitions
const CameraController: React.FC<{ targetPos: [number, number, number]; lookAtPos: [number, number, number] }> = ({
  targetPos,
  lookAtPos
}) => {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    // Animate camera position and target using GSAP for cinematic feel
    gsap.to(camera.position, {
      x: targetPos[0],
      y: targetPos[1],
      z: targetPos[2],
      duration: 1.5,
      ease: 'power2.out'
    });

    gsap.to(currentLookAt.current, {
      x: lookAtPos[0],
      y: lookAtPos[1],
      z: lookAtPos[2],
      duration: 1.5,
      ease: 'power2.out'
    });
  }, [targetPos, lookAtPos, camera]);

  useFrame(() => {
    camera.lookAt(currentLookAt.current);
  });

  return null;
};

export const MapScene: React.FC<MapSceneProps> = ({ currentBeat }) => {
  const distributors = useMemo(() => generateDistributors(), []);
  
  // RRefs for animation control
  const shopRef = useRef<THREE.Group>(null);
  const ghostCircleRef = useRef<THREE.Mesh>(null);
  const activeCircleRef = useRef<THREE.Mesh>(null);
  const riderRef = useRef<THREE.Group>(null);
  const particleGroupRef = useRef<THREE.Group>(null);

  // States derived from the active beat
  const activeBeatId = currentBeat?.id || '';
  const actionType = currentBeat?.visualAction?.type;

  // Render variables
  const showShop = activeBeatId !== 'intro';
  const showDistributors = showShop && activeBeatId !== 'shop_appear';

  // Bezier curve calculations for routes
  const routes = useMemo(() => {
    return distributors.map((d) => {
      const start = new THREE.Vector3(...d.position);
      const end = new THREE.Vector3(0, 0, 0);
      // Arched 3D curve control point
      const mid = new THREE.Vector3(
        (start.x + end.x) / 2,
        1.2,
        (start.z + end.z) / 2
      );
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(30);
      return { id: d.id, points, curve, selected: d.routeSelected };
    });
  }, [distributors]);

  // Particle simulation setup
  const particles = useMemo(() => {
    // Generate 3 particles per route
    const list: { progress: number; routeIndex: number; speed: number; offset: number }[] = [];
    routes.forEach((_, idx) => {
      for (let p = 0; p < 3; p++) {
        list.push({
          progress: 0,
          routeIndex: idx,
          speed: 0.15 + Math.random() * 0.1,
          offset: p * 0.33 // Spacing offset
        });
      }
    });
    return list;
  }, [routes]);

  // GSAP animations triggered by beat changes
  useEffect(() => {
    if (!currentBeat) return;

    // 1. Ghost circle pulse (Beat 3)
    if (activeBeatId === 'criteria_1' && ghostCircleRef.current) {
      gsap.fromTo(ghostCircleRef.current.scale, 
        { x: 0, z: 0 },
        { x: 1, z: 1, duration: 1.5, ease: 'power1.out', repeat: 2 }
      );
      gsap.fromTo(ghostCircleRef.current.material,
        { opacity: 0.8 },
        { opacity: 0, duration: 1.5, ease: 'power1.out', repeat: 2 }
      );
    }

    // 2. Draw 1km coverage radius circle (Beat 14)
    if (activeBeatId === 'radius_reveal' && activeCircleRef.current) {
      gsap.fromTo(activeCircleRef.current.scale,
        { x: 0, z: 0 },
        { x: 1, z: 1, duration: 2.0, ease: 'power3.out' }
      );
      const mat = activeCircleRef.current.material as THREE.MeshBasicMaterial;
      gsap.fromTo(mat,
        { opacity: 0 },
        { opacity: 0.2, duration: 2.0 }
      );
    }

    // 3. Reset animations if we go back to intro
    if (activeBeatId === 'intro') {
      if (activeCircleRef.current) {
        activeCircleRef.current.scale.set(0, 1, 0);
        (activeCircleRef.current.material as THREE.MeshBasicMaterial).opacity = 0;
      }
      if (riderRef.current) {
        riderRef.current.position.set(0, -10, 0);
      }
    }
  }, [activeBeatId, currentBeat]);

  // Frame animation loop
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    // Rotate central shop node gently
    if (shopRef.current && showShop) {
      shopRef.current.rotation.y = elapsed * 0.3;
    }

    // Particle flow logic
    if (particleGroupRef.current) {
      const isFlowing = actionType === 'flowParticles' || activeBeatId === 'replenished';
      particleGroupRef.current.children.forEach((mesh, index) => {
        if (!isFlowing) {
          mesh.position.set(0, -10, 0); // Hide
          return;
        }

        const pData = particles[index];
        const route = routes[pData.routeIndex];
        
        // Calculate progress based on time and index spacing
        let progress = (elapsed * pData.speed + pData.offset) % 1.0;
        
        // Stop particles at the shop if beat is "replenished"
        if (activeBeatId === 'replenished') {
          progress = 1.0;
        }

        const pos = route.curve.getPointAt(progress);
        mesh.position.copy(pos);
      });
    }

    // Rider Animation Stages
    if (riderRef.current) {
      if (activeBeatId === 'fleetless_intro') {
        // Appears at 1km boundary
        riderRef.current.position.set(2, 0.25, 2);
      } else if (activeBeatId === 'fleetless_rider_register') {
        // Moves to shop (0,0,0)
        const progress = Math.min(1.0, (state.clock.getElapsedTime() - (currentBeat?.startTime || 0)) / (currentBeat?.duration || 1));
        const start = new THREE.Vector3(2, 0.25, 2);
        const end = new THREE.Vector3(0, 0.25, 0);
        riderRef.current.position.lerpVectors(start, end, progress);
      } else if (activeBeatId === 'fleetless_lock_and_fill') {
        // Static at shop
        riderRef.current.position.set(0, 0.25, 0);
      } else if (activeBeatId === 'fleetless_deliver') {
        // Moves to a customer destination (e.g. [1.5, 0.25, -1.2])
        const progress = Math.min(1.0, (state.clock.getElapsedTime() - (currentBeat?.startTime || 0)) / (currentBeat?.duration || 1));
        const start = new THREE.Vector3(0, 0.25, 0);
        const end = new THREE.Vector3(1.5, 0.25, -1.2);
        riderRef.current.position.lerpVectors(start, end, progress);
      } else if (activeBeatId === 'tech_ops_team') {
        // Positioned for merge near shop
        riderRef.current.position.set(0.5, 0.25, 0.5);
      } else if (activeBeatId.startsWith('fleetless') === false && activeBeatId !== 'lean_strategy' && activeBeatId !== 'tech_ops_team' && activeBeatId !== 'validation') {
        // Offscreen
        riderRef.current.position.set(0, -10, 0);
      }
    }
  });

  // Calculate camera targets based on active beat
  const cameraTarget: [number, number, number] = currentBeat?.camera?.position || [0, 8, 8];
  const cameraLookAt: [number, number, number] = currentBeat?.camera?.lookAt || [0, 0, 0];

  // Procedural expansion clusters for Beat 19-20 (50km scale)
  const expansionClusters = useMemo(() => {
    // Generate 6 offset shop-radius coordinates for expansion zoom
    return [
      { id: 'c1', pos: [-6, 0, -4] as [number, number, number], color: '#00B14F' },
      { id: 'c2', pos: [7, 0, -5] as [number, number, number], color: '#00B14F' },
      { id: 'c3', pos: [-5, 0, 6] as [number, number, number], color: '#00B14F' },
      { id: 'c4', pos: [6, 0, 5] as [number, number, number], color: '#00B14F' },
      { id: 'c5', pos: [-11, 0, 2] as [number, number, number], color: '#00B14F' },
      { id: 'c6', pos: [12, 0, 1] as [number, number, number], color: '#00B14F' }
    ];
  }, []);

  const isExpansionActive = actionType === 'expansionZoom';

  return (
    <group>
      {/* Lighting */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />

      {/* Camera Coordinator */}
      <CameraController targetPos={cameraTarget} lookAtPos={cameraLookAt} />

      {/* Grid Floor Plane */}
      <gridHelper args={[30, 30, '#cbd5e1', '#f1f5f9']} position={[0, -0.01, 0]} />

      {/* 1. CENTRAL SHOP NODE */}
      {showShop && (
        <group ref={shopRef} position={[0, 0.25, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.5, 0.7]} />
            <meshStandardMaterial 
              color={
                activeBeatId === 'replenished' || activeBeatId.startsWith('fleetless') || activeBeatId === 'validation'
                  ? '#00B14F' // Primary Green
                  : '#FFD166' // Yellow highlight during selection
              } 
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, 0.26, 0]}>
            <boxGeometry args={[0.75, 0.05, 0.75]} />
            <meshStandardMaterial color="#1F2933" />
          </mesh>
          
          {/* Shop Label */}
          <Html position={[0, 0.6, 0]} center distanceFactor={8}>
            <div className={`shop-label ${activeBeatId === 'replenished' ? 'success' : ''}`}>
              {activeBeatId === 'replenished' ? 'Shop Replenished ✓' : 'Barqat Retail Shop'}
            </div>
          </Html>
        </group>
      )}

      {/* 2. DISTRIBUTORS & ROUTES */}
      {showDistributors && (
        <group>
          {/* Distributor Nodes */}
          {distributors.map((d) => (
            <group key={d.id} position={d.position}>
              <mesh>
                <cylinderGeometry args={[0.2, 0.2, 0.2, 16]} />
                <meshStandardMaterial 
                  color={
                    d.routeSelected && activeBeatId === 'criteria_2'
                      ? '#00B14F' // Highlighted distributor route
                      : '#94a3b8' // Inactive gray
                  }
                />
              </mesh>
              <Html position={[0, 0.35, 0]} center distanceFactor={8}>
                <div className="node-tag">{d.label}</div>
              </Html>
            </group>
          ))}

          {/* Arched Bezier Routes */}
          {routes.map((r) => {
            const isHighlighted = r.selected && (activeBeatId === 'criteria_2' || activeBeatId === 'replenish_routing');
            return (
              <Line
                key={r.id}
                points={r.points.map((p) => [p.x, p.y, p.z] as [number, number, number])}
                color={isHighlighted ? '#00B14F' : '#E5E7EB'}
                lineWidth={isHighlighted ? 3 : 1.5}
              />
            );
          })}

          {/* Selected based on P1 Curved Arrow Pointer (Beat 4) */}
          {activeBeatId === 'criteria_2' && (
            <group position={[-1.8, 1.2, 1.8]}>
              <Html center distanceFactor={6}>
                <div className="arrow-callout">
                  <div className="arrow-text">Selected based on P1</div>
                  <div className="arrow-tip">↓</div>
                </div>
              </Html>
            </group>
          )}
        </group>
      )}

      {/* 3. PARTICLES FOR REPLENISHMENT */}
      <group ref={particleGroupRef}>
        {particles.map((_, index) => (
          <mesh key={index}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshBasicMaterial color="#FFD166" />
          </mesh>
        ))}
      </group>

      {/* 4. COVERAGE CIRCLES */}
      {/* Ghost circular pulse (Beat 3) */}
      <mesh ref={ghostCircleRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.1, 2.5, 64]} />
        <meshBasicMaterial color="#FFD166" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      {/* 1km Radius coverage circle outline + fill (Beat 14+) */}
      <group>
        <mesh ref={activeCircleRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} scale={[0, 1, 0]}>
          <ringGeometry args={[2.45, 2.5, 64]} />
          <meshBasicMaterial color="#FFD166" side={THREE.DoubleSide} />
        </mesh>
        {/* Fill wash */}
        {activeBeatId !== 'intro' && activeBeatId !== 'shop_appear' && activeBeatId !== 'criteria_1' && activeBeatId !== 'criteria_2' && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
            <circleGeometry args={[2.45, 64]} />
            <meshBasicMaterial 
              color={
                activeBeatId === 'expansion_checklist' || activeBeatId === 'thank_you'
                  ? '#00B14F' // Turns solid green at full coverage
                  : '#FFD166' // Maize yellow wash
              } 
              transparent 
              opacity={
                activeBeatId === 'expansion_checklist' || activeBeatId === 'thank_you' 
                  ? 0.15 
                  : 0.08
              } 
            />
          </mesh>
        )}
      </group>

      {/* 5. 1KM SPOKES (Spreading N/S/E/W) */}
      {showShop && activeBeatId !== 'intro' && !isExpansionActive && (
        <group>
          {/* North Spoke */}
          <Line points={[[0, 0.01, 0], [0, 0.01, -2.5]]} color="#E5E7EB" lineWidth={1} dashed dashSize={0.2} gapSize={0.1} />
          <Text position={[0, 0.1, -1.3]} rotation={[0, 0, 0]} fontSize={0.18} color="#6b7280">
            1 km
          </Text>
          
          {/* South Spoke */}
          <Line points={[[0, 0.01, 0], [0, 0.01, 2.5]]} color="#E5E7EB" lineWidth={1} dashed dashSize={0.2} gapSize={0.1} />
          <Text position={[0, 0.1, 1.3]} rotation={[0, 0, 0]} fontSize={0.18} color="#6b7280">
            1 km
          </Text>

          {/* East Spoke */}
          <Line points={[[0, 0.01, 0], [2.5, 0.01, 0]]} color="#E5E7EB" lineWidth={1} dashed dashSize={0.2} gapSize={0.1} />
          <Text position={[1.3, 0.1, 0]} rotation={[0, Math.PI / 2, 0]} fontSize={0.18} color="#6b7280">
            1 km
          </Text>

          {/* West Spoke */}
          <Line points={[[0, 0.01, 0], [-2.5, 0.01, 0]]} color="#E5E7EB" lineWidth={1} dashed dashSize={0.2} gapSize={0.1} />
          <Text position={[-1.3, 0.1, 0]} rotation={[0, Math.PI / 2, 0]} fontSize={0.18} color="#6b7280">
            1 km
          </Text>
        </group>
      )}

      {/* 6. INDEPENDENT RIDER ICON */}
      <group ref={riderRef} position={[0, -10, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#FFD166" roughness={0.1} />
        </mesh>
        
        {/* Rider Badge Overlay */}
        <Html position={[0, 0.4, 0]} center distanceFactor={6}>
          <div className={`rider-badge ${activeBeatId === 'fleetless_rider_register' || activeBeatId.startsWith('fleetless_lock') ? 'registered' : ''}`}>
            {activeBeatId === 'fleetless_rider_register' ? 'Rider Registered ✓' : 
             activeBeatId.startsWith('fleetless_lock') ? '🔒 Order Locked' : 
             activeBeatId === 'fleetless_deliver' ? ' Delivering...' : 'Rider'}
          </div>
        </Html>
      </group>

      {/* 7. EXPANSION ZOOM (50KM FIELD CLUSTERS) */}
      {isExpansionActive && (
        <group>
          {expansionClusters.map((c) => (
            <group key={c.id} position={c.pos}>
              {/* Shop Mesh */}
              <mesh>
                <boxGeometry args={[0.5, 0.3, 0.5]} />
                <meshStandardMaterial color={c.color} />
              </mesh>
              {/* Active Circle Radius */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
                <ringGeometry args={[1.95, 2.0, 32]} />
                <meshBasicMaterial color="#FFD166" />
              </mesh>
              {/* Fill */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
                <circleGeometry args={[1.95, 32]} />
                <meshBasicMaterial 
                  color={
                    activeBeatId === 'expansion_checklist' || activeBeatId === 'thank_you'
                      ? '#00B14F' 
                      : '#FFD166'
                  } 
                  transparent 
                  opacity={0.12} 
                />
              </mesh>
            </group>
          ))}
          {/* Main expanded count overlay */}
          <group position={[0, 3, 0]}>
            <Html center distanceFactor={12}>
              <div className="expansion-badge">
                Expanded Active Coverage Area
              </div>
            </Html>
          </group>
        </group>
      )}

      {/* Global CSS Styles injected dynamically */}
      <Html>
        <style>{`
          .shop-label {
            background: #1f2937;
            color: white;
            padding: 4px 10px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 600;
            white-space: nowrap;
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            border: 1px solid rgba(255,255,255,0.1);
            transition: all 0.3s;
          }

          .shop-label.success {
            background: var(--primary-green);
            color: white;
            border-color: rgba(255,255,255,0.2);
            box-shadow: 0 4px 12px rgba(0, 177, 79, 0.35);
          }

          .node-tag {
            background: #4b5563;
            color: white;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 9px;
            font-weight: 600;
            opacity: 0.9;
          }

          .arrow-callout {
            background: var(--maize-yellow);
            color: var(--charcoal);
            padding: 6px 10px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 700;
            white-space: nowrap;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            animation: bounce 2s infinite;
          }

          .arrow-tip {
            font-size: 14px;
            margin-top: -2px;
          }

          .rider-badge {
            background: #374151;
            color: white;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 9px;
            font-weight: 600;
            white-space: nowrap;
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          }

          .rider-badge.registered {
            background: var(--primary-green);
            color: white;
          }

          .expansion-badge {
            background: #1f2937;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 700;
            white-space: nowrap;
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--primary-green);
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        `}</style>
      </Html>
    </group>
  );
};
