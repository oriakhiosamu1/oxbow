// src/utlis/GlobalStyles.jsx
import React from 'react';

const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&family=Playfair+Display:wght@400;700;900&display=swap');

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .font-display {
            font-family: 'Playfair Display', serif;
        }

        .font-body {
            font-family: 'Inter', sans-serif;
        }

        .btn-primary {
            @apply bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 border-2 border-blue-500;
        }

        /* Accent colors */
        .text-accent-500 { color: #FF6B6B; }
        .bg-accent-500 { background-color: #FF6B6B; }
        .hover\\:text-accent-500:hover { color: #FF6B6B; }
        .hover\\:border-accent-400:hover { border-color: #FFA3A3; }


        .card {
            @apply bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out transform border border-gray-200;
        }

        .section-header {
            @apply font-extrabold text-blue-800 text-center;
        }

        /* Custom Animations */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }

        @keyframes fadeInFast {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in-fast { animation: fadeInFast 0.3s ease-out forwards; }


        @keyframes slideInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-up { animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .animate-slide-in-up.delay-200 { animation-delay: 0.2s; }
        .animate-slide-in-up.delay-300 { animation-delay: 0.3s; }
        .animate-slide-in-up.delay-400 { animation-delay: 0.4s; }
        .animate-slide-in-up.delay-500 { animation-delay: 0.5s; }
        .animate-slide-in-up.delay-600 { animation-delay: 0.6s; }
        .animate-slide-in-up.delay-700 { animation-delay: 0.7s; }
        .animate-slide-in-up.delay-800 { animation-delay: 0.8s; }
        .animate-slide-in-up.delay-900 { animation-delay: 0.9s; }
        .animate-slide-in-up.delay-1000 { animation-delay: 1.0s; }
        .animate-slide-in-up.delay-1100 { animation-delay: 1.1s; }
        .animate-slide-in-up.delay-1200 { animation-delay: 1.2s; }


        @keyframes zoomIn {
            from { transform: scale(1.08); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .animate-zoom-in { animation: zoomIn 1.2s ease-out forwards; }

        @keyframes zoomInFast {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .animate-zoom-in-fast { animation: zoomInFast 0.4s ease-out forwards; }


        @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in { animation: scaleIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

        /* Removed @keyframes popInBounce and its class */


        /* Preloader Animations */
        @keyframes spin-slow-preloader {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow-preloader { animation: spin-slow-preloader 3s linear infinite; }

        @keyframes bounce-subtle {
            0%, 100% { transform: translateY(0) scale(1.1); }
            50% { transform: translateY(-8px) scale(1.1); }
        }
        .animate-bounce-subtle { animation: bounce-subtle 1.8s infinite ease-in-out; }

        @keyframes pulse-fade {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        .animate-pulse-fade { animation: pulse-fade 2s infinite ease-in-out; }

        @keyframes pulse-scale {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15); }
        }
        .animate-pulse-scale { animation: pulse-scale 2s infinite ease-in-out; }

        @keyframes preloaderRipple {
            0% { transform: scale(0); opacity: 1; }
            100% { transform: scale(2.5); opacity: 0; }
        }
        .animate-preloader-ripple {
            animation: preloaderRipple 1.5s forwards;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .animate-preloader-container {
            position: relative;
        }

        @keyframes slideDown {
            from { transform: translateY(-100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down { animation: slideDown 0.7s ease-out forwards; }

        /* Location Map Animations */
        @keyframes drawPath {
            from { stroke-dashoffset: 1000; }
            to { stroke-dashoffset: 0; }
        }
        .animate-draw-path {
            animation: drawPath 3s ease-in-out forwards;
            stroke-dasharray: 1000;
        }

        @keyframes glowPulse {
            0%, 100% { box-shadow: 0 0 10px rgba(66, 153, 225, 0.6), 0 0 20px rgba(66, 153, 225, 0.4); }
            50% { box-shadow: 0 0 30px rgba(66, 153, 225, 1), 0 0 60px rgba(66, 153, 225, 0.8); }
        }
        .animate-glow-pulse { animation: glowPulse 2s infinite alternate; }

        @keyframes moveIcon1 {
            0% { transform: translate(0, 0); opacity: 0; }
            20% { opacity: 1; }
            80% { transform: translate(120px, 120px); opacity: 1; }
            100% { opacity: 0; transform: translate(150px, 150px); }
        }
        .animate-move-icon-1 { animation: moveIcon1 4s linear infinite; }

        @keyframes moveIcon2 {
            0% { transform: translate(0, 0); opacity: 0; }
            20% { opacity: 1; }
            80% { transform: translate(-80px, 80px); opacity: 1; }
            100% { opacity: 0; transform: translate(-100px, 100px); }
        }
        .animate-move-icon-2 { animation: moveIcon2 4.5s linear infinite; }

        @keyframes moveIcon3 {
            0% { transform: translate(0, 0); opacity: 0; }
            20% { opacity: 1; }
            80% { transform: translate(50px, -100px); opacity: 1; }
            100% { opacity: 0; transform: translate(70px, -120px); }
        }
        .animate-move-icon-3 { animation: moveIcon3 5s linear infinite; }


        @keyframes pulse-button {
            0% { transform: scale(1); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            50% { transform: scale(1.02); box-shadow: 0 8px 12px rgba(0,0,0,0.2); }
            100% { transform: scale(1); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        }
        .animate-pulse-button { animation: pulse-button 2s infinite ease-in-out; }

        @keyframes popIn {
            0% { opacity: 0; transform: scale(0.9) translateY(20px); }
            80% { transform: scale(1.02); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-pop-in { animation: popIn 0.6s cubic-bezier(0.2, 0.8, 0.4, 1) forwards; }
        .animate-pop-in.delay-50 { animation-delay: 0.05s; }
        .animate-pop-in.delay-80 { animation-delay: 0.08s; }
        .animate-pop-in.delay-100 { animation-delay: 0.1s; }
        .animate-pop-in.delay-150 { animation-delay: 0.15s; }
        .animate-pop-in.delay-200 { animation-delay: 0.2s; }
        .animate-pop-in.delay-250 { animation-delay: 0.25s; }
        .animate-pop-in.delay-300 { animation-delay: 0.3s; }
        .animate-pop-in.delay-350 { animation-delay: 0.35s; }
        .animate-pop-in.delay-400 { animation-delay: 0.4s; }
        .animate-pop-in.delay-450 { animation-delay: 0.45s; }
        .animate-pop-in.delay-500 { animation-delay: 0.5s; }
        .animate-pop-in.delay-600 { animation-delay: 0.6s; }
        .animate-pop-in.delay-700 { animation-delay: 0.7s; }
        .animate-pop-in.delay-800 { animation-delay: 0.8s; }


        /* Removed @keyframes heroGradientOverlay */

        /* Text wave effect for hero heading */
        @keyframes textWave {
            0%, 100% { transform: translateY(0); }
            20% { transform: translateY(-5px); }
            40% { transform: translateY(0); }
            60% { transform: translateY(-3px); }
            80% { transform: translateY(0); }
        }
        .animate-text-wave {
            display: inline-block;
            animation: textWave 2s cubic-bezier(0.42, 0, 0.58, 1) infinite;
        }

        /* Removed @keyframes textRevealGradient and .animate-text-reveal-gradient */
        /* Removed @keyframes textWaveReveal and .animate-text-wave-reveal */


        @keyframes scaleUp {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-up { animation: scaleUp 0.6s ease-out forwards; }

        @keyframes tiltIn {
            0% { opacity: 0; transform: rotateX(-30deg) translateY(50px) scale(0.8); }
            100% { opacity: 1; transform: rotateX(0deg) translateY(0) scale(1); }
        }
        .animate-tilt-in { animation: tiltIn 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-tilt-in.delay-400 { animation-delay: 0.4s; }
        .animate-tilt-in.delay-500 { animation-delay: 0.5s; }
        .animate-tilt-in.delay-600 { animation-delay: 0.6s; }
        .animate-tilt-in.delay-700 { animation-delay: 0.7s; }
        .animate-tilt-in.delay-800 { animation-delay: 0.8s; }
        .animate-tilt-in.delay-900 { animation-delay: 0.9s; }

        @keyframes bounceIcon {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        .animate-bounce-icon { animation: bounceIcon 1.5s ease-in-out infinite; }

        @keyframes bounceIconSmall {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
        }
        .animate-bounce-icon-small { animation: bounceIconSmall 1s ease-in-out infinite; }

        @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 5px rgba(255, 107, 107, 0.3); }
            50% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.7); }
        }
        .animate-pulse-glow { animation: pulseGlow 2s infinite ease-in-out; }

        @keyframes floatUp {
            0% { transform: translateX(-50%) translateY(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(-50%) translateY(-10px); }
        }
        .animate-float-up { animation: floatUp 0.3s ease-out forwards; }

        @keyframes scaleUpOnHover {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
        }
        .animate-scale-up-on-hover:hover .absolute { animation: scaleUpOnHover 0.5s forwards; }

        @keyframes pulseRight {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(5px); }
        }
        .animate-pulse-right {
            animation: pulseRight 0.7s ease-in-out infinite;
        }

        /* Continuous subtle float for cards */
        @keyframes floatSubtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
        }
        .animate-float-subtle { animation: floatSubtle 3s ease-in-out infinite; }
        .group:hover .animate-float-subtle { animation-play-state: paused; }

        /* Lighter float for smaller elements/icons in header/footer */
        @keyframes floatSubtleLight {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
        }
        .animate-float-subtle-light { animation: floatSubtleLight 2s ease-in-out infinite; }

        /* Removed @keyframes shimmerBg and .animate-shimmer-bg */

        /* Input focus glow */
        @keyframes inputGlow {
            0% { box-shadow: 0 0 0 0 rgba(66, 153, 225, 0.5); border-color: #60A5FA; }
            50% { box-shadow: 0 0 0 8px rgba(66, 153, 225, 0); border-color: #3B82F6; }
            100% { box-shadow: 0 0 0 0 rgba(66, 153, 225, 0.5); border-color: #60A5FA; }
        }
        .focus\\:animate-input-glow:focus {
            animation: inputGlow 1.5s infinite ease-out;
            outline: none;
        }

        /* Subtle background sparkle effect for hero and footer */
        @keyframes bgSparkle {
            0% { transform: translate(0, 0) scale(1); opacity: 0.05; }
            25% { transform: translate(10%, 20%) scale(1.05); opacity: 0.1; }
            50% { transform: translate(-10%, -20%) scale(1); opacity: 0.05; }
            75% { transform: translate(15%, -10%) scale(1.03); opacity: 0.1; }
            100% { transform: translate(0, 0) scale(1); opacity: 0.05; }
        }
        .animate-bg-sparkle {
            animation: bgSparkle 20s infinite ease-in-out;
            background-image: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%);
            background-size: 300% 300%;
        }
        .animate-bg-sparkle-footer {
            animation: bgSparkle 25s infinite ease-in-out reverse;
            background-image: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 80%);
            background-size: 250% 250%;
        }

        /* New: Star Trail Effect (subtle background for Hero) */
        @keyframes starTrail {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 100%; }
        }
        .animate-star-trail {
            background-image: radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px);
            background-size: 20px 20px;
            animation: starTrail 60s linear infinite;
        }


        /* Magic Button Hover Effect */
        .magic-btn-hover {
            position: relative;
            z-index: 1;
            transition: all 0.3s ease-out;
            overflow: hidden;
            border-radius: 9999px;
        }
        .magic-btn-hover:before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            transition: all 0.7s ease-out;
            z-index: -1;
        }
        .magic-btn-hover:hover:before {
            left: 100%;
        }
        .magic-btn-hover:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0;
            background-color: rgba(255,255,255,0.1);
            transition: height 0.3s ease-out;
            z-index: -1;
        }
        .magic-btn-hover:hover:after {
            height: 100%;
        }
        .magic-btn-hover:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(66, 153, 225, 0.7);
        }
        .magic-btn-hover:active {
            transform: scale(0.98);
        }
        .magic-btn-hover span.relative.z-10:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: width 0s, height 0s, opacity 0.5s;
        }
        .magic-btn-hover:hover span.relative.z-10:after {
            width: 200%;
            height: 200%;
            opacity: 1;
            transition: width 0.8s ease-out, height 0.8s ease-out, opacity 0.5s ease-out;
        }


        /* Card Magic Hover Effect */
        .card-magic-hover {
            position: relative;
            overflow: hidden;
            transform-style: preserve-3d;
            perspective: 1000px;
            transition: transform 0.5s ease-out, box-shadow 0.5s ease-out, border-color 0.5s ease-out;
            border: 2px solid transparent;
        }
        .card-magic-hover:hover {
            transform: scale(1.03) translateY(-5px) rotateX(2deg) rotateY(2deg);
            box-shadow: 0 15px 30px rgba(0,0,0,0.3), 0 0 20px rgba(66,153,225,0.5);
            border-image: linear-gradient(45deg, #60A5FA, #9333ea, #EF4444);
            border-image-slice: 1;
            animation: borderGlow 2s infinite alternate;
        }

        /* Animated border for cards */
        @keyframes borderGlow {
            0% { border-color: #60A5FA; }
            33% { border-color: #9333ea; }
            66% { border-color: #EF4444; }
            100% { border-color: #60A5FA; }
        }


        .card-magic-hover:before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at center, rgba(135,206,250,0.3) 0%, transparent 50%);
            opacity: 0;
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
            transform: scale(0.5);
            z-index: 0;
        }
        .card-magic-hover:hover:before {
            opacity: 1;
            transform: scale(1);
            animation: radialShine 1.5s infinite alternate;
        }
        @keyframes radialShine {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(1.05); opacity: 0.8; }
        }

        /* NEW: Alternative Card Magic Hover (for Dining Section category/branch cards) */
        .card-magic-hover-alt {
            position: relative;
            z-index: 1;
            transition: all 0.3s ease-out;
            overflow: hidden;
        }
        .card-magic-hover-alt:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%);
            transform: translateX(-100%);
            transition: transform 0.6s ease-out;
            z-index: -1;
        }
        .card-magic-hover-alt:hover:before {
            transform: translateX(100%);
        }
        .card-magic-hover-alt:hover {
            box-shadow: 0 10px 20px rgba(0,0,0,0.2), 0 0 15px rgba(66,153,225,0.4);
        }


        /* Confetti Burst Animation (for success feedback) */
        @keyframes confettiBurst {
            0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
            100% { transform: translateY(-500px) rotate(720deg) scale(0); opacity: 0; }
        }
        .animate-confetti-burst {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            pointer-events: none;
            animation: confettiBurst 2s forwards ease-out;
            background:
                url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="5" height="5" fill="%23f00"/><rect x="5" y="5" width="5" height="5" fill="%230f0"/><rect x="0" y="5" width="5" height="5" fill="%2300f"/><rect x="5" y="0" width="5" height="5" fill="%23ff0"/></svg>') 0 0 / 20px 20px repeat,
                url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><circle cx="5" cy="5" r="4" fill="%23f66"/></svg>') 20px 20px / 15px 15px repeat,
                url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><polygon points="5,0 10,10 0,10" fill="%2366f"/></svg>') 40px 40px / 12px 12px repeat;
        }

        /* Sparkle Pop Animation (for smaller, gamified feedback) */
        @keyframes sparklePop {
            0% { transform: scale(0) rotate(0deg); opacity: 1; }
            50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
            100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        .animate-sparkle-pop {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50px;
            height: 50px;
            pointer-events: none;
            animation: sparklePop 1s forwards ease-out;
            background: radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
            border-radius: 50%;
            box-shadow: 0 0 15px 5px rgba(255,255,255,0.7);
        }

        /* New Blob Background Animations */
        @keyframes blobFlow {
            0% { transform: translate(0, 0) scale(1); border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
            25% { transform: translate(10%, 5%) scale(1.05); border-radius: 50% 50% 40% 60% / 50% 40% 60% 50%; }
            50% { transform: translate(0, -10%) scale(0.95); border-radius: 70% 30% 70% 30% / 30% 70% 30% 70%; }
            75% { transform: translate(-5%, 10%) scale(1.03); border-radius: 40% 60% 60% 40% / 60% 60% 40% 40%; }
            100% { transform: translate(0, 0) scale(1); border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
        .animate-blob-flow {
            position: absolute;
            width: 150%;
            height: 150%;
            background: linear-gradient(135deg, rgba(135,206,250,0.1) 0%, rgba(147,112,219,0.1) 100%);
            filter: blur(80px);
            animation: blobFlow 25s infinite ease-in-out;
            left: -25%;
            top: -25%;
            z-index: 0;
            pointer-events: none;
        }

        @keyframes blobFlowReverse {
            0% { transform: translate(0, 0) scale(1); border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
            25% { transform: translate(-10%, -5%) scale(1.05); border-radius: 50% 50% 40% 60% / 50% 40% 60% 50%; }
            50% { transform: translate(0, 10%) scale(0.95); border-radius: 70% 30% 70% 30% / 30% 70% 30% 70%; }
            75% { transform: translate(5%, -10%) scale(1.03); border-radius: 40% 60% 60% 40% / 60% 60% 40% 40%; }
            100% { transform: translate(0, 0) scale(1); border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
        .animate-blob-flow-reverse {
            position: absolute;
            width: 150%;
            height: 150%;
            background: linear-gradient(45deg, rgba(255,107,107,0.1) 0%, rgba(255,165,0,0.1) 100%);
            filter: blur(80px);
            animation: blobFlowReverse 25s infinite ease-in-out;
            left: -25%;
            top: -25%;
            z-index: 0;
            pointer-events: none;
        }

        /* Review Modal Specific Glow */
        @keyframes modalGlow {
            0% { box-shadow: 0 0 10px rgba(66, 153, 225, 0.4); }
            50% { box-shadow: 0 0 25px rgba(66, 153, 225, 0.8), 0 0 50px rgba(147,112,219,0.5); }
            100% { box-shadow: 0 0 10px rgba(66, 153, 225, 0.4); }
        }
        .review-modal-glow {
            animation: modalGlow 3s infinite alternate;
        }

        /* Nav Link Underline Glow */
        .nav-link-underline-glow {
            background: linear-gradient(90deg, #60A5FA, #9333ea, #EF4444);
            filter: blur(2px);
        }
        .group:hover .nav-link-underline-glow {
            animation: navLinkUnderlineGlow 0.5s ease-out forwards;
        }
        @keyframes navLinkUnderlineGlow {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
        }

        /* NEW: Booking Confirmation Glow */
        @keyframes bookingConfirmGlow {
            0%, 100% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.5); }
            50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.8), 0 0 50px rgba(16, 185, 129, 0.3); }
        }
        .booking-confirm-glow {
            animation: bookingConfirmGlow 3s infinite alternate;
        }

        /* NEW: Pulse Button Red (for cancel button) */
        @keyframes pulseButtonRed {
            0% { transform: scale(1); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            50% { transform: scale(1.02); box-shadow: 0 8px 12px rgba(0,0,0,0.2); }
            100% { transform: scale(1); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        }
        .animate-pulse-button-red { animation: pulseButtonRed 2s infinite ease-in-out; }
    `}</style>
);

export default GlobalStyles;
