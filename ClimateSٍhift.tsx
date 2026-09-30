import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Sun,
  Waves,
  CloudRain,
  Trees,
  Factory,
  RotateCcw,
  Share2,
  Sparkles,
  Heart,
  Smile,
  Frown,
  Meh,
  Eye,
  Sliders,
  Award,
  Zap,
  Bike,
  Recycle,
  X,
  Volume2,
  VolumeX,
  ChevronRight,
  HelpCircle,
  CheckCircle,
  Copy
} from 'lucide-react';

const KIDS_PRESETS = [
  {
    id: 'happy',
    name: 'Happy Green City',
    emoji: '🌈',
    color: 'from-emerald-400 to-teal-400',
    params: { temp: 0.5, seaLevel: 0.1, rain: 1, green: 90, smog: 1 }
  },
  {
    id: 'hot',
    name: 'Hot Sunny Day',
    emoji: '☀️',
    color: 'from-amber-400 to-orange-400',
    params: { temp: 4.2, seaLevel: 0.4, rain: 0, green: 25, smog: 2 }
  },
  {
    id: 'flood',
    name: 'Splash & Flood',
    emoji: '🌊',
    color: 'from-cyan-400 to-blue-500',
    params: { temp: 2.0, seaLevel: 1.8, rain: 3, green: 50, smog: 1 }
  },
  {
    id: 'smoky',
    name: 'Smoky Factory',
    emoji: '🏭',
    color: 'from-purple-400 to-slate-500',
    params: { temp: 3.5, seaLevel: 0.8, rain: 2, green: 20, smog: 3 }
  }
];

// Arabic Educational Insights for Kids
const CLIMATE_FACTS = {
  temp: {
    title: 'ارتفاع الحرارة 🌡️',
    cause: 'زيادة غازات الاحتباس الحراري ودخان السيارات والمصانع اللي بتحبس حرارة الشمس جوة الغلاف الجوي زي الصوبة.',
    solution: 'نقلل استخدام العربيات ونمشي أو نركب العجل 🚲، ونوفر كهرباء البيت عن طريق إطفاء الأنوار اللي مش محتاجينها 💡.'
  },
  seaLevel: {
    title: 'ارتفاع مستوى البحر 🌊',
    cause: 'لما حرارة الكوكب بتزيد، الثلج في القطبين بيدوب والمية بتزيد في البحار والمحيطات وتغرق السواحل.',
    solution: 'نحافظ على البيئة ونبني حواجز طبيعية زي زراعة الأشجار الساحلية وتجنب البناء القريب جداً من شاطئ البحر.'
  },
  rain: {
    title: 'الأمطار الشديدة والأعاصير 🌧️',
    cause: 'الحرارة العالية بتخلي مية البحار تتبخر بسرعة أكبر، فبتتكون سحب ضخمة بتطرد أمطار غزيرة ومفاجئة.',
    solution: 'نعمل حدائق ومساحات خضراء في المدينة تمتص مية المطر، ونحافظ على شبكات تصريف المية نظيفة.'
  },
  green: {
    title: 'الأشجار والحدائق 🌳',
    cause: 'قطع الأشجار والبناء الإسمنتي المستمر بيخلي المدينة حر جداً وبتقلل الأوكسجين النقي.',
    solution: 'نزود زراعة الأشجار والحدائق ورقع الخضرة في سطح البيوت والمقابر والمقاعد والمواقف لانها بتهدّي الحرارة وتنقي الجو!'
  },
  smog: {
    title: 'دخان المصانع والتلوث 🏭',
    cause: 'حرق الوقود والأدخنة غير المفلترة من المصانع والعربيات القديمة بتعمل سحابة سوداء مضرّة بالصحة.',
    solution: 'نعتمد على الطاقة النظيفة زي الشمس والرياح ☀️، ونعيد تدوير الورق والبلاستيك (Recycling) ♻️.'
  }
};

function useCartoonCityCanvas(canvasRef, params) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Cute animated entities
    let frame = 0;
    const cars = [
      { x: 30, speed: 1.2, color: '#ff4b4b' },
      { x: 220, speed: 0.9, color: '#3b82f6' },
      { x: 450, speed: 1.5, color: '#f59e0b' }
    ];

    const fishList = [
      { x: 100, y: 0, speed: 0.6 },
      { x: 250, y: 0, speed: 0.8 },
      { x: 400, y: 0, speed: 0.5 }
    ];

    const clouds = [
      { x: 50, y: 35, r: 25, speed: 0.2 },
      { x: 250, y: 50, r: 30, speed: 0.3 },
      { x: 480, y: 30, r: 22, speed: 0.25 }
    ];

    const render = () => {
      frame++;
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;

      // Clear & Background Sky
      let skyGradient = ctx.createLinearGradient(0, 0, 0, h);
      if (params.temp > 3.5) {
        skyGradient.addColorStop(0, '#fde68a'); // Warm orange-yellow heat
        skyGradient.addColorStop(1, '#fbcfe8');
      } else if (params.rain >= 3) {
        skyGradient.addColorStop(0, '#64748b'); // Dark storm cloud sky
        skyGradient.addColorStop(1, '#94a3b8');
      } else {
        skyGradient.addColorStop(0, '#7dd3fc'); // Happy bright blue sky
        skyGradient.addColorStop(1, '#bae6fd');
      }
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, w, h);

      // Cartoon Sun (with sweating or smiling face)
      const sunX = w * 0.85;
      const sunY = 55;
      ctx.fillStyle = params.temp > 3.0 ? '#ff5722' : '#fbbf24';
      ctx.beginPath();
      ctx.arc(sunX, sunY, 32 + Math.sin(frame * 0.05) * 3, 0, Math.PI * 2);
      ctx.fill();

      // Sun rays
      ctx.strokeStyle = ctx.fillStyle;
      ctx.lineWidth = 4;
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4 + frame * 0.02;
        ctx.beginPath();
        ctx.moveTo(sunX + Math.cos(angle) * 38, sunY + Math.sin(angle) * 38);
        ctx.lineTo(sunX + Math.cos(angle) * 48, sunY + Math.sin(angle) * 48);
        ctx.stroke();
      }

      // Sun Face
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(sunX - 10, sunY - 5, 4, 0, Math.PI * 2);
      ctx.arc(sunX + 10, sunY - 5, 4, 0, Math.PI * 2);
      ctx.fill();

      // Smile or Hot Mouth
      ctx.beginPath();
      if (params.temp > 3.0) {
        // Sweating mouth
        ctx.arc(sunX, sunY + 12, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
      } else {
        ctx.arc(sunX, sunY + 4, 10, 0, Math.PI);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#1e293b';
        ctx.stroke();
      }

      // Smog Cloud Overlay if high emissions
      if (params.smog > 1) {
        ctx.fillStyle = `rgba(120, 113, 108, ${params.smog * 0.18})`;
        ctx.fillRect(0, 0, w, h * 0.6);
      }

      // Background Hills
      ctx.fillStyle = params.temp > 3.5 ? '#b45309' : '#4ade80';
      ctx.beginPath();
      ctx.ellipse(w * 0.2, h * 0.65, 180, 70, 0, 0, Math.PI * 2);
      ctx.ellipse(w * 0.75, h * 0.68, 220, 80, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cartoon Buildings
      const buildingColors = ['#f43f5e', '#a855f7', '#06b6d4', '#eab308', '#3b82f6'];
      const numBldg = 5;
      const bldgWidth = 55;

      for (let i = 0; i < numBldg; i++) {
        const bx = 60 + i * 90;
        const bh = 110 + (i % 3) * 30;
        const by = h * 0.65 - bh;

        // Main Block
        ctx.fillStyle = buildingColors[i % buildingColors.length];
        ctx.beginPath();
        ctx.roundRect(bx, by, bldgWidth, bh, [12, 12, 0, 0]);
        ctx.fill();

        // Roof Garden if High Greenery
        if (params.green > 60) {
          ctx.fillStyle = '#22c55e';
          ctx.beginPath();
          ctx.arc(bx + 15, by - 6, 12, 0, Math.PI * 2);
          ctx.arc(bx + 35, by - 6, 14, 0, Math.PI * 2);
          ctx.fill();
        }

        // Windows (Smiley)
        for (let wy = by + 16; wy < h * 0.62 - 20; wy += 28) {
          for (let wx = bx + 10; wx < bx + bldgWidth - 15; wx += 22) {
            ctx.fillStyle = '#fef08a';
            ctx.beginPath();
            ctx.roundRect(wx, wy, 14, 16, 4);
            ctx.fill();
          }
        }
      }

      // Factory Chimney & Smog Rings
      const facX = w - 90;
      const facY = h * 0.65 - 90;
      ctx.fillStyle = '#64748b';
      ctx.fillRect(facX, facY, 40, 90);
      if (params.smog > 1) {
        ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
        for (let s = 0; s < params.smog * 2; s++) {
          const sy = facY - 15 - s * 20 - (frame % 20);
          ctx.beginPath();
          ctx.arc(facX + 20 + Math.sin(s + frame * 0.05) * 8, sy, 10 + s * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Trees in Park/City (Adapts to Greenery parameter)
      const greenRatio = params.green / 100;
      const treeCount = Math.floor(12 * greenRatio);

      for (let t = 0; t < treeCount; t++) {
        const tx = 20 + t * 45;
        const ty = h * 0.65;

        // Trunk
        ctx.fillStyle = '#78350f';
        ctx.fillRect(tx - 3, ty - 15, 6, 15);

        // Foliage
        ctx.fillStyle = params.temp > 3.8 ? '#d97706' : '#16a34a';
        ctx.beginPath();
        ctx.arc(tx, ty - 22, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      // Road & Moving Cars
      const roadY = h * 0.66;
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, roadY, w, 35);

      // Dashed lane
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 3;
      ctx.setLineDash([12, 12]);
      ctx.beginPath();
      ctx.moveTo(0, roadY + 17);
      ctx.lineTo(w, roadY + 17);
      ctx.stroke();
      ctx.setLineDash([]);

      // Cute Bouncing Cars
      cars.forEach((car) => {
        car.x += car.speed;
        if (car.x > w + 40) car.x = -40;

        const bounce = Math.abs(Math.sin(frame * 0.2 + car.x)) * 3;
        ctx.fillStyle = car.color;
        ctx.beginPath();
        ctx.roundRect(car.x, roadY + 8 - bounce, 28, 14, 6);
        ctx.fill();

        // Car wheels
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(car.x + 6, roadY + 22 - bounce, 4, 0, Math.PI * 2);
        ctx.arc(car.x + 22, roadY + 22 - bounce, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Water / Ocean Level (Rises with Sea Level slider)
      const baseWaterY = h * 0.78;
      const seaRisePixels = params.seaLevel * 25; // Rise water up
      const waterY = baseWaterY - seaRisePixels;

      const waterGrad = ctx.createLinearGradient(0, waterY, 0, h);
      waterGrad.addColorStop(0, '#38bdf8');
      waterGrad.addColorStop(1, '#0284c7');

      ctx.fillStyle = waterGrad;
      ctx.beginPath();
      ctx.moveTo(0, waterY);

      // Waves animation
      for (let x = 0; x <= w; x += 20) {
        const wave = Math.sin(x * 0.03 + frame * 0.08) * (4 + params.rain);
        ctx.lineTo(x, waterY + wave);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      // Fish swimming in water
      fishList.forEach((fish, idx) => {
        fish.x += fish.speed;
        if (fish.x > w + 20) fish.x = -20;
        const fy = waterY + 25 + (idx * 15) % 30;

        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.ellipse(fish.x, fy, 8, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        // Tail
        ctx.beginPath();
        ctx.moveTo(fish.x - 6, fy);
        ctx.lineTo(fish.x - 12, fy - 4);
        ctx.lineTo(fish.x - 12, fy + 4);
        ctx.closePath();
        ctx.fill();
      });

      // Cute Floating Clouds & Rain
      clouds.forEach((cloud) => {
        cloud.x += cloud.speed;
        if (cloud.x > w + 50) cloud.x = -50;

        ctx.fillStyle = params.rain >= 2 ? '#475569' : '#ffffff';
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.r, 0, Math.PI * 2);
        ctx.arc(cloud.x + 20, cloud.y - 8, cloud.r * 0.8, 0, Math.PI * 2);
        ctx.arc(cloud.x + 40, cloud.y, cloud.r * 0.8, 0, Math.PI * 2);
        ctx.fill();

        // Rain drops if rain slider is active
        if (params.rain > 0) {
          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 2;
          for (let r = 0; r < params.rain * 4; r++) {
            const rx = cloud.x - 10 + (r * 12) % 50;
            const ry = cloud.y + 20 + ((frame * 6 + r * 15) % 100);
            if (ry < waterY) {
              ctx.beginPath();
              ctx.moveTo(rx, ry);
              ctx.lineTo(rx - 2, ry + 8);
              ctx.stroke();
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [params]);
}

export default function App() {
  const [params, setParams] = useState({
    temp: 1.0,
    seaLevel: 0.2,
    rain: 1, // 0: Sun, 1: Soft Rain, 2: Heavy, 3: Storm
    green: 70, // 0 - 100 %
    smog: 1 // 1: Clean, 2: Medium, 3: Heavy
  });

  const [isCompare, setIsCompare] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [activeInfoKey, setActiveInfoKey] = useState(null); // Key for Arabic info popup

  const canvasRef = useRef(null);
  const compareCanvasRef = useRef(null);

  useCartoonCityCanvas(canvasRef, params);

  // Baseline static params for Compare mode
  const happyBaseline = useMemo(() => ({
    temp: 0.5,
    seaLevel: 0.1,
    rain: 1,
    green: 85,
    smog: 1
  }), []);

  useCartoonCityCanvas(compareCanvasRef, happyBaseline);

  // Parameter Change Handler
  const updateParam = (key, val) => {
    setParams((prev) => ({ ...prev, [key]: val }));
  };

  // Preset Applicator
  const applyPreset = (preset) => {
    setParams(preset.params);
  };

  // Reset to Happy State
  const handleReset = () => {
    setParams({ temp: 0.5, seaLevel: 0.1, rain: 1, green: 85, smog: 1 });
  };

  const healthMetrics = useMemo(() => {
    const heatPenalty = (params.temp / 5) * 30;
    const floodPenalty = (params.seaLevel / 2) * 30;
    const smogPenalty = (params.smog - 1) * 15;
    const greenBonus = (params.green / 100) * 25;

    const happiness = Math.max(10, Math.min(100, Math.round(100 - heatPenalty - floodPenalty - smogPenalty + greenBonus)));

    let face = <Smile className="w-8 h-8 text-emerald-400 animate-bounce" />;
    let moodText = 'سعيد جداً! 🌈';

    if (happiness < 40) {
      face = <Frown className="w-8 h-8 text-rose-400 animate-bounce" />;
      moodText = 'المدينة محتاجة مساعدة! 💔';
    } else if (happiness < 70) {
      face = <Meh className="w-8 h-8 text-amber-400" />;
      moodText = 'الحال متوسط... 😐';
    }

    return { happiness, face, moodText };
  }, [params]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-indigo-100 text-slate-800 font-sans dir-rtl" dir="rtl">
      {/* 1. FUN KID HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b-4 border-sky-300 px-4 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-pink-400 to-sky-400 p-1 shadow-md transform hover:rotate-6 transition-all">
              <div className="w-full h-full bg-white rounded-[12px] flex items-center justify-center text-2xl">
                🌍
              </div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-sky-600 tracking-wide flex items-center gap-2">
                مختبر المناخ للصغار <Sparkles className="w-5 h-5 text-amber-400" />
              </h1>
              <p className="text-xs font-bold text-slate-500">جرب وشوف مدينتك بتتغير إزاي!</p>
            </div>
          </div>

          {/* Quick Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs shadow-md border-b-4 border-amber-600 active:translate-y-1 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> إعادة ضبط
            </button>
            <button
              onClick={() => setShowCertificate(true)}
              className="px-3 py-2 rounded-2xl bg-pink-500 hover:bg-pink-400 text-white font-bold text-xs shadow-md border-b-4 border-pink-700 active:translate-y-1 transition-all flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" /> وسام بطل المدينة
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN EXPERIENCE CONTAINER */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
        {/* PRESET QUICK BUTTONS */}
        <div className="bg-white/90 rounded-3xl p-4 shadow-lg border-4 border-sky-200 space-y-2">
          <div className="flex items-center gap-2 font-black text-sky-700 text-xs sm:text-sm">
            <span>✨ اختار تجربة سريعة للمدينة:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {KIDS_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className={`p-3 rounded-2xl bg-gradient-to-r ${preset.color} text-slate-900 font-black text-xs shadow-md border-b-4 border-black/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2`}
              >
                <span className="text-xl">{preset.emoji}</span>
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CANVAS + CONTROLS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: CLIMATE LAB SLIDERS WITH ARABIC CAUSE & SOLUTION BUTTONS */}
          <div className="lg:col-span-5 bg-white/90 rounded-3xl p-5 shadow-xl border-4 border-sky-200 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3">
              <h2 className="font-black text-slate-800 text-base flex items-center gap-2">
                <Sliders className="w-5 h-5 text-sky-500" /> لوحة التحكم والتحربة
              </h2>
              <span className="text-[10px] font-bold bg-sky-100 text-sky-600 px-2.5 py-1 rounded-full">
                حرك المؤشر وشوف!
              </span>
            </div>

            <div className="space-y-3">
              {/* 1. Heat Slider */}
              <div className="bg-orange-50 p-3 rounded-2xl border-2 border-orange-200 space-y-1.5">
                <div className="flex justify-between items-center font-black text-xs text-orange-700">
                  <span className="flex items-center gap-1">🌡️ مستوى الحرارة</span>
                  <div className="flex items-center gap-2">
                    <span>+{params.temp}°م</span>
                    <button
                      onClick={() => setActiveInfoKey('temp')}
                      className="px-2 py-0.5 rounded-full bg-orange-200 text-orange-800 text-[10px] hover:bg-orange-300 font-extrabold flex items-center gap-1 shadow-sm"
                    >
                      <HelpCircle className="w-3 h-3" /> ليه ده بيحصل؟
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5.0"
                  step="0.5"
                  value={params.temp}
                  onChange={(e) => updateParam('temp', parseFloat(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer h-3 bg-orange-200 rounded-lg"
                />
              </div>

              {/* 2. Sea Level Slider */}
              <div className="bg-sky-50 p-3 rounded-2xl border-2 border-sky-200 space-y-1.5">
                <div className="flex justify-between items-center font-black text-xs text-sky-700">
                  <span className="flex items-center gap-1">🌊 مستوى البحر والمية</span>
                  <div className="flex items-center gap-2">
                    <span>+{params.seaLevel}متر</span>
                    <button
                      onClick={() => setActiveInfoKey('seaLevel')}
                      className="px-2 py-0.5 rounded-full bg-sky-200 text-sky-800 text-[10px] hover:bg-sky-300 font-extrabold flex items-center gap-1 shadow-sm"
                    >
                      <HelpCircle className="w-3 h-3" /> ليه ده بيحصل؟
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2.0"
                  step="0.2"
                  value={params.seaLevel}
                  onChange={(e) => updateParam('seaLevel', parseFloat(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer h-3 bg-sky-200 rounded-lg"
                />
              </div>

              {/* 3. Rain Level Slider */}
              <div className="bg-blue-50 p-3 rounded-2xl border-2 border-blue-200 space-y-1.5">
                <div className="flex justify-between items-center font-black text-xs text-blue-700">
                  <span className="flex items-center gap-1">🌧️ الأمطار والغيووم</span>
                  <div className="flex items-center gap-2">
                    <span>{['مشمس ☀️', 'مطر خفيف 🌧️️', 'غزير ⛈️', 'عاصفة ⚡'][params.rain]}</span>
                    <button
                      onClick={() => setActiveInfoKey('rain')}
                      className="px-2 py-0.5 rounded-full bg-blue-200 text-blue-800 text-[10px] hover:bg-blue-300 font-extrabold flex items-center gap-1 shadow-sm"
                    >
                      <HelpCircle className="w-3 h-3" /> ليه ده بيحصل؟
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="1"
                  value={params.rain}
                  onChange={(e) => updateParam('rain', parseInt(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-3 bg-blue-200 rounded-lg"
                />
              </div>

              {/* 4. Greenery Slider */}
              <div className="bg-emerald-50 p-3 rounded-2xl border-2 border-emerald-200 space-y-1.5">
                <div className="flex justify-between items-center font-black text-xs text-emerald-700">
                  <span className="flex items-center gap-1">🌳 الأشجار والحدائق</span>
                  <div className="flex items-center gap-2">
                    <span>{params.green}%</span>
                    <button
                      onClick={() => setActiveInfoKey('green')}
                      className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 text-[10px] hover:bg-emerald-300 font-extrabold flex items-center gap-1 shadow-sm"
                    >
                      <HelpCircle className="w-3 h-3" /> إزاي نساعد؟
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={params.green}
                  onChange={(e) => updateParam('green', parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-3 bg-emerald-200 rounded-lg"
                />
              </div>

              {/* 5. Smog Slider */}
              <div className="bg-purple-50 p-3 rounded-2xl border-2 border-purple-200 space-y-1.5">
                <div className="flex justify-between items-center font-black text-xs text-purple-700">
                  <span className="flex items-center gap-1">💨 دخان المصانع والتلوث</span>
                  <div className="flex items-center gap-2">
                    <span>{['', 'نقي 🍃', 'متوسط ☁️', 'كثيف 🏭'][params.smog]}</span>
                    <button
                      onClick={() => setActiveInfoKey('smog')}
                      className="px-2 py-0.5 rounded-full bg-purple-200 text-purple-800 text-[10px] hover:bg-purple-300 font-extrabold flex items-center gap-1 shadow-sm"
                    >
                      <HelpCircle className="w-3 h-3" /> ليه ده بيحصل؟
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="1"
                  value={params.smog}
                  onChange={(e) => updateParam('smog', parseInt(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer h-3 bg-purple-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* CENTER: CARTOON CANVAS & COMPARE TOGGLE */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white/90 rounded-3xl p-3 shadow-xl border-4 border-sky-200 relative overflow-hidden">
              {/* Compare Toggle Header */}
              <div className="flex justify-between items-center mb-2 px-2">
                <span className="font-black text-xs text-slate-700 flex items-center gap-1">
                  🎬 محاكاة المدينة المباشرة
                </span>
                <button
                  onClick={() => setIsCompare(!isCompare)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border-2 ${
                    isCompare
                      ? 'bg-sky-500 text-white border-sky-600'
                      : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {isCompare ? 'عرض شاشة واحدة 👁️' : 'مقارنة قبل وبعد ⚖️'}
                </button>
              </div>

              {/* Canvas Container */}
              <div className={`grid ${isCompare ? 'grid-cols-1 sm:grid-cols-2 gap-2' : 'grid-cols-1'}`}>
                {/* Main Interactive Canvas */}
                <div className="relative aspect-[4/3] w-full bg-sky-100 rounded-2xl overflow-hidden border-2 border-sky-300 shadow-inner">
                  <canvas ref={canvasRef} className="w-full h-full block" />
                  <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full font-black text-[11px] text-sky-700 shadow-sm">
                    تجربتك الحالية 🧪
                  </div>
                </div>

                {/* Compare Baseline Canvas */}
                {isCompare && (
                  <div className="relative aspect-[4/3] w-full bg-sky-100 rounded-2xl overflow-hidden border-2 border-emerald-300 shadow-inner">
                    <canvas ref={compareCanvasRef} className="w-full h-full block" />
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full font-black text-[11px] shadow-sm">
                      المدينة السعيدة الأصلية 🌈
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* DASHBOARD: CITY HEALTH METER */}
            <div className="bg-white/90 rounded-3xl p-4 shadow-xl border-4 border-sky-200 flex flex-wrap items-center justify-between gap-4">
              {/* Mood Badge */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-2xl border-2 border-slate-200">
                  {healthMetrics.face}
                </div>
                <div>
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase">
                    مؤشر سعادة المدينة
                  </div>
                  <div className="text-base font-black text-slate-800">
                    {healthMetrics.moodText}
                  </div>
                </div>
              </div>

              {/* Health Score Progress Bar */}
              <div className="flex-1 min-w-[180px] space-y-1">
                <div className="flex justify-between text-xs font-black">
                  <span className="text-slate-600">درجة صحة المدينة</span>
                  <span className="text-sky-600">{healthMetrics.happiness}%</span>
                </div>
                <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden border-2 border-slate-200 p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 rounded-full transition-all duration-500"
                    style={{ width: `${healthMetrics.happiness}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. KIDS ACTION CARDS ("SAVE THE CITY!") */}
        <section className="bg-white/90 rounded-3xl p-5 shadow-xl border-4 border-sky-200 space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-lg font-black text-slate-800 flex items-center justify-center gap-2">
              🦸 كن بطلاً للمدينة! إزاي نقدر نساعد؟
            </h3>
            <p className="text-xs font-bold text-slate-500">اضغط على أي زِرّ من دول عشان تحمي مدينتك فوراً!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Action 1 */}
            <div className="bg-emerald-50 rounded-2xl p-4 border-2 border-emerald-200 flex flex-col justify-between items-center text-center space-y-3">
              <div className="text-3xl">🌳</div>
              <div>
                <h4 className="font-black text-sm text-emerald-800">نزرع أشجار وحدائق</h4>
                <p className="text-[11px] font-bold text-emerald-600">الأشجار بتمتص التلوث وتهدي حرارة الجو!</p>
              </div>
              <button
                onClick={() => updateParam('green', 100)}
                className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs shadow-md active:scale-95 transition-all"
              >
                ازرع شجر دلوقتي! 🌲
              </button>
            </div>

            {/* Action 2 */}
            <div className="bg-sky-50 rounded-2xl p-4 border-2 border-sky-200 flex flex-col justify-between items-center text-center space-y-3">
              <div className="text-3xl">🚲</div>
              <div>
                <h4 className="font-black text-sm text-sky-800">نركب عجل بدل العربيات</h4>
                <p className="text-[11px] font-bold text-sky-600">بيقلل العوادم وينظف هواء المدينة!</p>
              </div>
              <button
                onClick={() => updateParam('smog', 1)}
                className="w-full py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-black text-xs shadow-md active:scale-95 transition-all"
              >
                نظّف الهواء! 🍃
              </button>
            </div>

            {/* Action 3 */}
            <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200 flex flex-col justify-between items-center text-center space-y-3">
              <div className="text-3xl">☀️</div>
              <div>
                <h4 className="font-black text-sm text-amber-800">نستخدم طاقة شمسية</h4>
                <p className="text-[11px] font-bold text-amber-600">طاقة نظيفة تحمي الكوكب من الاحتباس الحراري!</p>
              </div>
              <button
                onClick={() => updateParam('temp', 0.5)}
                className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-xs shadow-md active:scale-95 transition-all"
              >
                هدي الحرارة! ❄️
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 4. ARABIC EDUCATIONAL CAUSE & SOLUTION MODAL */}
      {activeInfoKey && CLIMATE_FACTS[activeInfoKey] && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-4 border-sky-400 max-w-md w-full p-6 space-y-4 shadow-2xl relative animate-bounceIn text-right" dir="rtl">
            <button
              onClick={() => setActiveInfoKey(null)}
              className="absolute top-4 left-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2 text-xl font-black text-sky-700 border-b-2 border-sky-100 pb-2">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <span>{CLIMATE_FACTS[activeInfoKey].title}</span>
            </div>

            {/* Section 1: Cause */}
            <div className="bg-orange-50 p-4 rounded-2xl border-2 border-orange-200 space-y-1">
              <div className="font-black text-xs text-orange-800 flex items-center gap-1.5">
                <span>❓ إيه السبب في ده؟</span>
              </div>
              <p className="text-xs font-bold text-slate-700 leading-relaxed">
                {CLIMATE_FACTS[activeInfoKey].cause}
              </p>
            </div>

            {/* Section 2: Solution */}
            <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-200 space-y-1">
              <div className="font-black text-xs text-emerald-800 flex items-center gap-1.5">
                <span>🌱 إزاي نقدر نساعد في حله؟</span>
              </div>
              <p className="text-xs font-bold text-slate-700 leading-relaxed">
                {CLIMATE_FACTS[activeInfoKey].solution}
              </p>
            </div>

            <button
              onClick={() => setActiveInfoKey(null)}
              className="w-full py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-black text-xs shadow-md border-b-4 border-sky-700 transition-all"
            >
              فهمت خلاص! 🚀
            </button>
          </div>
        </div>
      )}

      {/* 5. CITY GUARDIAN CERTIFICATE MODAL */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-4 border-amber-400 max-w-md w-full p-6 text-center space-y-4 shadow-2xl relative animate-bounceIn">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 left-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-4xl">🏆</div>
            <h3 className="text-xl font-black text-amber-600">وسام حامي المدينة!</h3>
            <p className="text-xs font-bold text-slate-600">
              مبروك! انت جربت تغيرات المناخ وعرفت إزاي تحمي مدينتك وكوكب الأرض!
            </p>

            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 font-mono text-xs text-slate-700 space-y-1">
              <div>صحة المدينة: <strong>{healthMetrics.happiness}%</strong></div>
              <div>الأشجار المزروعة: <strong>{params.green}%</strong></div>
            </div>

            <button
              onClick={() => setShowCertificate(false)}
              className="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs shadow-md border-b-4 border-amber-600 transition-all"
            >
              كمل اللعب والاكتشاف! 🚀
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="text-center py-6 text-xs font-extrabold text-sky-700">
        🎈 مختبر المناخ للصغار — اتعلم واحمي كوكبنا!
      </footer>
    </div>
  );
}