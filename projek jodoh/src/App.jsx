import { useState, useRef, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// ─── FIREBASE ────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyCKo_Of_UjaZ1iLFHCRZqSykHrIvVYt0v4",
  authDomain: "ramalan-jodoh-5eeda.firebaseapp.com",
  projectId: "ramalan-jodoh-5eeda",
  storageBucket: "ramalan-jodoh-5eeda.firebasestorage.app",
  messagingSenderId: "96861097676",
  appId: "1:96861097676:web:44ecc40693aa1406a0fc69"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
async function saveToFirebase(name1, name2, score, lang) {
  try { await addDoc(collection(db, "searches"), { name1: name1.trim(), name2: name2.trim(), score, lang, timestamp: serverTimestamp() }); }
  catch(e) { console.error(e); }
}

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  ms: {
    flag:"🇲🇾", label:"BM",
    title:"Ramalan Jodoh",
    subtitle:"Multi-Layer Numerologi Engine",
    name1:"Nama Pertama", name2:"Nama Kedua",
    ph1:"cth: Amirul Aiman", ph2:"cth: Aisya Humaira",
    btn:"✨ Kira Jodoh Sekarang",
    hint:"* Guna nama penuh untuk analisis lebih mendalam",
    loading:"Menganalisis DNA Nama...",
    loadingDesc:["Mengira Nombor Ekspresi, Jiwa & Personaliti","Menjalankan Harmony Matrix 9×9","Mengira 8 Dimensi Keserasian..."],
    pct:"peratus", grade:"Gred",
    masterAlert:"Nombor Master Terkesan!",
    masterDesc:"Salah satu nama mengandungi nombor master (11/22/33) — tanda getaran istimewa",
    strength:"🏆 Kekuatan Terbesar", weakness:"⚠️ Perlu Perhatian",
    advice:"💌 Nasihat Hubungan",
    analysis:"📊 Analisis 8 Dimensi",
    tapHint:"💡 Tap pada bar untuk keterangan lanjut",
    numerology:"🔢 Profil Numerologi",
    lucky:"✨ Ramalan Bertuah",
    share:"📤 Share", tryAgain:"🔄 Cuba Lagi",
    disclaimer:"* Ramalan untuk hiburan semata-mata 😄💕",
    copied:"✅ Disalin!", copyBtn:"📋 Salin & Share", close:"Tutup",
    shareTitle:"— ✦ SHARE CARD ✦ —",
    shareScore:"Skor Keserasian",
    shareStrength:"🏆 Kekuatan", shareWeakness:"⚠️ Fokus Sini",
    luckyLabels:["Nombor","Hari","Warna","Batu","Bulan","Soul No."],
    numeLabels:["Ekspresi","Jiwa/Soul","Personaliti","Chaldean"],
    numeDesc:["Pythagorean","Vokal","Konsonan","Sistem Babilon"],
    numeDesc2:["Jalan hidup","Hasrat dalaman","Imej luaran","Getaran rohani"],
    cats:[
      {label:"💬 Komunikasi", desc:"Keupayaan kamu berdua untuk saling memahami, berbual terbuka, dan menyampaikan perasaan dengan jelas.", weight:"18%"},
      {label:"🤝 Keserasian", desc:"Keselarasan nilai hidup, matlamat, dan pandangan dunia kamu berdua pada peringkat terdalam.", weight:"18%"},
      {label:"🔥 Tarikan", desc:"Daya tarikan semula jadi — kimia fizikal dan emosi yang terasa bila bersama.", weight:"12%"},
      {label:"🌱 Masa Depan", desc:"Potensi jangka panjang — sejauh mana kamu berdua boleh membina kehidupan bersama.", weight:"15%"},
      {label:"🧠 Kefahaman", desc:"Empati dan kedalaman emosi — sejauh mana kamu benar-benar memahami perasaan antara satu sama lain.", weight:"14%"},
      {label:"😂 Keseronokan", desc:"Keserasian dalam humor, tenaga, dan keseronokan bila bersama.", weight:"10%"},
      {label:"💰 Kestabilan", desc:"Keserasian praktikal dalam urusan harian, kewangan, dan cara menangani cabaran hidup.", weight:"8%"},
      {label:"🌸 Kelembutan", desc:"Tahap kasih sayang, romantik, dan kelembutan dalam hubungan kamu berdua.", weight:"5%"},
    ],
    verdicts:[
      {emoji:"💍",title:"Jodoh Takdir!",grade:"A+",
        desc:"MasyaAllah — ini luar biasa! Nama kamu berdua menghasilkan resonans numerologi yang sangat jarang berlaku. Keserasian pada semua lapisan semuanya selaras dengan indah.",
        advice:"Jangan sia-siakan ikatan yang sangat kuat ini. Bina komunikasi terbuka, rancang masa depan bersama. Pasangan seperti ini jarang ditemui. 💕"},
      {emoji:"🌹",title:"Serasi Sekali!",grade:"A",
        desc:"Getaran nama kamu berdua sangat harmoni. Ada tarikan semula jadi yang kuat dan keserasian mendalam. Hubungan ini mempunyai asas kukuh untuk berkembang.",
        advice:"Fokus pada komunikasi dan jangan biarkan ego menghalang keindahan yang ada. Luangkan masa berkualiti bersama. 🌸"},
      {emoji:"✨",title:"Ada Potensi!",grade:"B",
        desc:"Terdapat keserasian bermakna dengan beberapa aspek yang sangat kuat. Namun ada perbezaan yang boleh menjadi cabaran — atau kekuatan jika diurus bijak.",
        advice:"Kenalpasti kekuatan hubungan kamu dan jadikan ia tunjang. Untuk kelemahan — bersabar dan saling faham. 💫"},
      {emoji:"🌱",title:"Perlu Usaha!",grade:"C",
        desc:"Numerologi menunjukkan perbezaan ketara dalam beberapa dimensi penting. Ini bukan bermakna tidak boleh berjaya — tetapi memerlukan usaha lebih sedar.",
        advice:"Jangan patah semangat. Hubungan yang dibina dengan usaha keras selalunya lebih kuat. Fokus komunikasi terbuka. 🤝"},
      {emoji:"⚡",title:"Cabaran Besar!",grade:"D",
        desc:"Getaran nama kamu berdua menunjukkan perbezaan ketara dalam hampir semua dimensi. Kamu mungkin mempunyai cara fikir dan nilai yang sangat berbeza.",
        advice:"Setiap hubungan adalah mungkin dengan komitmen yang betul. Berbincanglah secara terbuka tentang perbezaan kamu. 🌊"},
    ],
  },
  en: {
    flag:"🇬🇧", label:"EN",
    title:"Love Compatibility",
    subtitle:"Multi-Layer Numerology Engine",
    name1:"First Name", name2:"Second Name",
    ph1:"e.g: James William", ph2:"e.g: Emily Rose",
    btn:"✨ Calculate Now",
    hint:"* Use full name for deeper analysis",
    loading:"Analysing Name DNA...",
    loadingDesc:["Calculating Expression, Soul & Personality Numbers","Running 9×9 Harmony Matrix","Analysing 8 Compatibility Dimensions..."],
    pct:"percent", grade:"Grade",
    masterAlert:"Master Number Detected!",
    masterDesc:"One of the names contains a master number (11/22/33) — a sign of special vibration",
    strength:"🏆 Greatest Strength", weakness:"⚠️ Needs Attention",
    advice:"💌 Relationship Advice",
    analysis:"📊 8-Dimension Analysis",
    tapHint:"💡 Tap a bar for detailed description",
    numerology:"🔢 Numerology Profile",
    lucky:"✨ Lucky Predictions",
    share:"📤 Share", tryAgain:"🔄 Try Again",
    disclaimer:"* For entertainment purposes only 😄💕",
    copied:"✅ Copied!", copyBtn:"📋 Copy & Share", close:"Close",
    shareTitle:"— ✦ SHARE CARD ✦ —",
    shareScore:"Compatibility Score",
    shareStrength:"🏆 Strength", shareWeakness:"⚠️ Focus Here",
    luckyLabels:["Number","Day","Colour","Gem","Month","Soul No."],
    numeLabels:["Expression","Soul Urge","Personality","Chaldean"],
    numeDesc:["Pythagorean","Vowels","Consonants","Babylonian"],
    numeDesc2:["Life path","Inner desire","Outer image","Spiritual vibration"],
    cats:[
      {label:"💬 Communication", desc:"How well you both understand each other, speak openly, and express feelings clearly.", weight:"18%"},
      {label:"🤝 Compatibility", desc:"Alignment of life values, goals, and worldview at the deepest level.", weight:"18%"},
      {label:"🔥 Attraction", desc:"Natural attraction — the physical and emotional chemistry felt together.", weight:"12%"},
      {label:"🌱 Future", desc:"Long-term potential — how well you can build a life and family together.", weight:"15%"},
      {label:"🧠 Understanding", desc:"Empathy and emotional depth — how truly you understand each other's feelings.", weight:"14%"},
      {label:"😂 Fun", desc:"Compatibility in humour, energy, and enjoyment when together.", weight:"10%"},
      {label:"💰 Stability", desc:"Practical compatibility in daily affairs, finances, and handling life challenges.", weight:"8%"},
      {label:"🌸 Tenderness", desc:"Level of affection, romance, and gentleness in your relationship.", weight:"5%"},
    ],
    verdicts:[
      {emoji:"💍",title:"Destined!",grade:"A+",
        desc:"MasyaAllah — this is extraordinary! Your names produce a numerological resonance that is extremely rare. Compatibility across all layers aligns beautifully.",
        advice:"Don't waste this incredibly strong bond. Build open communication and plan your future together. Pairs like this are rare. 💕"},
      {emoji:"🌹",title:"Highly Compatible!",grade:"A",
        desc:"Your name vibrations are very harmonious. There is a strong natural attraction and deep compatibility. This relationship has a solid foundation to grow.",
        advice:"Focus on communication and don't let ego block what you already have. Spend quality time together. 🌸"},
      {emoji:"✨",title:"Has Potential!",grade:"B",
        desc:"There is meaningful compatibility with some very strong aspects. But there are differences that could be challenges — or strengths if managed wisely.",
        advice:"Identify your relationship strengths and make them your pillar. For weaknesses — be patient and understanding. 💫"},
      {emoji:"🌱",title:"Needs Work!",grade:"C",
        desc:"Numerology shows notable differences in several important dimensions. This doesn't mean it can't succeed — but it requires more conscious effort.",
        advice:"Don't give up. Relationships built through hard work are often the strongest. Focus on open communication. 🤝"},
      {emoji:"⚡",title:"Big Challenge!",grade:"D",
        desc:"Your name vibrations show significant differences across almost all dimensions. You may have very different ways of thinking and values.",
        advice:"Any relationship is possible with the right commitment. Talk openly about your differences. 🌊"},
    ],
  },
  zh: {
    flag:"🇨🇳", label:"中文",
    title:"缘分测算",
    subtitle:"多层数字命理引擎",
    name1:"第一个名字", name2:"第二个名字",
    ph1:"例如：李伟明", ph2:"例如：陈慧珍",
    btn:"✨ 立即测算",
    hint:"* 使用全名以获得更深入的分析",
    loading:"正在分析姓名DNA...",
    loadingDesc:["计算表达数、灵魂数和个性数","运行9×9和谐矩阵","分析8个兼容维度..."],
    pct:"百分", grade:"等级",
    masterAlert:"检测到主数！",
    masterDesc:"其中一个名字包含主数(11/22/33) — 特殊振动的迹象",
    strength:"🏆 最大优势", weakness:"⚠️ 需要关注",
    advice:"💌 关系建议",
    analysis:"📊 8维度分析",
    tapHint:"💡 点击条形查看详细说明",
    numerology:"🔢 数字命理档案",
    lucky:"✨ 幸运预测",
    share:"📤 分享", tryAgain:"🔄 再试一次",
    disclaimer:"* 仅供娱乐 😄💕",
    copied:"✅ 已复制!", copyBtn:"📋 复制分享", close:"关闭",
    shareTitle:"— ✦ 分享卡 ✦ —",
    shareScore:"兼容性分数",
    shareStrength:"🏆 优势", shareWeakness:"⚠️ 重点关注",
    luckyLabels:["数字","日子","颜色","宝石","月份","灵魂数"],
    numeLabels:["表达数","灵魂数","个性数","迦勒底数"],
    numeDesc:["毕达哥拉斯","元音","辅音","巴比伦系统"],
    numeDesc2:["人生道路","内心渴望","外在形象","灵性振动"],
    cats:[
      {label:"💬 沟通", desc:"你们双方相互理解、坦诚交流和清晰表达感受的能力。", weight:"18%"},
      {label:"🤝 兼容性", desc:"在最深层次上，你们的生活价值观、目标和世界观的一致性。", weight:"18%"},
      {label:"🔥 吸引力", desc:"自然吸引力——在一起时感受到的身体和情感化学反应。", weight:"12%"},
      {label:"🌱 未来", desc:"长期潜力——你们能在多大程度上共同建立生活和家庭。", weight:"15%"},
      {label:"🧠 理解", desc:"同理心和情感深度——你们真正理解彼此感受的程度。", weight:"14%"},
      {label:"😂 乐趣", desc:"在幽默、活力和一起享乐方面的兼容性。", weight:"10%"},
      {label:"💰 稳定性", desc:"日常事务、财务和处理生活挑战方面的实际兼容性。", weight:"8%"},
      {label:"🌸 温柔", desc:"你们关系中的情感、浪漫和温柔程度。", weight:"5%"},
    ],
    verdicts:[
      {emoji:"💍",title:"天作之合！",grade:"A+",
        desc:"太不可思议了！你们的名字产生了极为罕见的数字共鸣。所有层面的兼容性都完美对齐。",
        advice:"不要浪费这种极强的纽带。建立开放的沟通，共同规划未来。这样的伴侣很难得。💕"},
      {emoji:"🌹",title:"非常兼容！",grade:"A",
        desc:"你们名字的振动非常和谐。有强烈的自然吸引力和深层次的兼容性。这段关系有坚实的基础。",
        advice:"专注于沟通，不要让自我阻碍已有的美好。一起度过高质量的时光。🌸"},
      {emoji:"✨",title:"有潜力！",grade:"B",
        desc:"存在有意义的兼容性，某些方面非常强。但也有差异可能成为挑战——或者如果处理得当，可以成为优势。",
        advice:"找出你们关系的优势，让它成为支柱。对于弱点——保持耐心和相互理解。💫"},
      {emoji:"🌱",title:"需要努力！",grade:"C",
        desc:"数字命理显示几个重要维度存在显著差异。这不意味着不能成功——但需要更有意识的努力。",
        advice:"不要灰心。通过艰苦努力建立的关系往往是最强的。专注于开放的沟通。🤝"},
      {emoji:"⚡",title:"重大挑战！",grade:"D",
        desc:"你们的名字振动在几乎所有维度上都显示出显著差异。你们可能有非常不同的思维方式和价值观。",
        advice:"有了正确的承诺，任何关系都是可能的。坦诚地讨论你们的差异。🌊"},
    ],
  },
  ta: {
    flag:"🇮🇳", label:"தமிழ்",
    title:"காதல் பொருத்தம்",
    subtitle:"பல அடுக்கு எண் கணிப்பு இயந்திரம்",
    name1:"முதல் பெயர்", name2:"இரண்டாம் பெயர்",
    ph1:"எ.கா: முருகன் செல்வம்", ph2:"எ.கா: கவிதா தேவி",
    btn:"✨ இப்போது கணக்கிடு",
    hint:"* ஆழமான பகுப்பாய்விற்கு முழு பெயரைப் பயன்படுத்தவும்",
    loading:"பெயர் DNA பகுப்பாய்வு...",
    loadingDesc:["வெளிப்பாடு, ஆன்மா மற்றும் ஆளுமை எண்களை கணக்கிடுதல்","9×9 நல்லிணக்க அணியை இயக்குதல்","8 பரிமாண இணக்கத்தன்மையை பகுப்பாய்வு..."],
    pct:"சதவீதம்", grade:"தரம்",
    masterAlert:"முதன்மை எண் கண்டறியப்பட்டது!",
    masterDesc:"ஒரு பெயரில் முதன்மை எண் (11/22/33) உள்ளது — சிறப்பு அதிர்வின் அறிகுறி",
    strength:"🏆 மிகப்பெரிய பலம்", weakness:"⚠️ கவனிக்க வேண்டியது",
    advice:"💌 உறவு ஆலோசனை",
    analysis:"📊 8 பரிமாண பகுப்பாய்வு",
    tapHint:"💡 விவரங்களுக்கு பட்டையை தட்டவும்",
    numerology:"🔢 எண் கணிப்பு சுயவிவரம்",
    lucky:"✨ அதிர்ஷ்ட கணிப்புகள்",
    share:"📤 பகிர்", tryAgain:"🔄 மீண்டும் முயற்சி",
    disclaimer:"* பொழுதுபோக்கு நோக்கங்களுக்காக மட்டுமே 😄💕",
    copied:"✅ நகலெடுக்கப்பட்டது!", copyBtn:"📋 நகலெடுத்து பகிர்", close:"மூடு",
    shareTitle:"— ✦ பகிர்வு அட்டை ✦ —",
    shareScore:"இணக்கத்தன்மை மதிப்பெண்",
    shareStrength:"🏆 பலம்", shareWeakness:"⚠️ கவனம் செலுத்தவும்",
    luckyLabels:["எண்","நாள்","நிறம்","கல்","மாதம்","ஆன்மா எண்"],
    numeLabels:["வெளிப்பாடு","ஆன்மா","ஆளுமை","சால்டியன்"],
    numeDesc:["பைதாகரஸ்","உயிரெழுத்து","மெய்யெழுத்து","பாபிலோனியன்"],
    numeDesc2:["வாழ்க்கை பாதை","உள் விருப்பம்","வெளி தோற்றம்","ஆன்மீக அதிர்வு"],
    cats:[
      {label:"💬 தொடர்பு", desc:"நீங்கள் இருவரும் ஒருவரையொருவர் புரிந்துகொள்ளும், வெளிப்படையாக பேசும் மற்றும் உணர்வுகளை தெளிவாக தெரிவிக்கும் திறன்.", weight:"18%"},
      {label:"🤝 இணக்கம்", desc:"உங்கள் இருவரின் வாழ்க்கை மதிப்புகள், இலக்குகள் மற்றும் உலகக் கண்ணோட்டத்தின் ஆழமான சீரமைவு.", weight:"18%"},
      {label:"🔥 ஈர்ப்பு", desc:"இயற்கையான ஈர்ப்பு — ஒன்றாக இருக்கும்போது உணரப்படும் உடல் மற்றும் உணர்ச்சி வேதியியல்.", weight:"12%"},
      {label:"🌱 எதிர்காலம்", desc:"நீண்டகால திறன் — நீங்கள் இருவரும் எந்த அளவிற்கு ஒன்றாக வாழ்க்கையை கட்டியெழுப்ப முடியும்.", weight:"15%"},
      {label:"🧠 புரிதல்", desc:"பச்சாதாபம் மற்றும் உணர்ச்சி ஆழம் — நீங்கள் ஒருவரின் உணர்வுகளை எவ்வளவு உண்மையாக புரிந்துகொள்கிறீர்கள்.", weight:"14%"},
      {label:"😂 மகிழ்ச்சி", desc:"நகைச்சுவை, ஆற்றல் மற்றும் ஒன்றாக இருக்கும்போது மகிழ்வதில் இணக்கத்தன்மை.", weight:"10%"},
      {label:"💰 நிலைத்தன்மை", desc:"அன்றாட விவகாரங்கள், நிதி மற்றும் வாழ்க்கை சவால்களை கையாள்வதில் நடைமுறை இணக்கத்தன்மை.", weight:"8%"},
      {label:"🌸 மென்மை", desc:"உங்கள் உறவில் அன்பு, காதல் மற்றும் மென்மையின் அளவு.", weight:"5%"},
    ],
    verdicts:[
      {emoji:"💍",title:"விதி நிர்ணயித்தது!",grade:"A+",
        desc:"அற்புதம்! உங்கள் பெயர்கள் மிகவும் அரிதான எண் ஒத்திசைவை உருவாக்குகின்றன. அனைத்து அடுக்குகளிலும் இணக்கம் அழகாக சீரமைகிறது.",
        advice:"இந்த வலுவான பிணைப்பை வீணாக்காதீர்கள். திறந்த தொடர்பை உருவாக்கி, எதிர்காலத்தை திட்டமிடுங்கள். 💕"},
      {emoji:"🌹",title:"மிகவும் இணக்கமானது!",grade:"A",
        desc:"உங்கள் பெயர் அதிர்வுகள் மிகவும் இயைபானவை. வலுவான இயற்கையான ஈர்ப்பு மற்றும் ஆழமான இணக்கம் உள்ளது.",
        advice:"தொடர்பில் கவனம் செலுத்துங்கள். தரமான நேரத்தை ஒன்றாக கழியுங்கள். 🌸"},
      {emoji:"✨",title:"திறன் உள்ளது!",grade:"B",
        desc:"சில மிகவும் வலுவான அம்சங்களுடன் அர்த்தமுள்ள இணக்கம் உள்ளது. ஆனால் சவால்களாக இருக்கலாம் என்ற வேறுபாடுகளும் உள்ளன.",
        advice:"உங்கள் உறவின் பலங்களை கண்டறிந்து அதை தூண்டுகோலாக செய்யுங்கள். 💫"},
      {emoji:"🌱",title:"முயற்சி தேவை!",grade:"C",
        desc:"எண் கணிப்பு சில முக்கியமான பரிமாணங்களில் குறிப்பிடத்தக்க வேறுபாடுகளை காட்டுகிறது.",
        advice:"தைரியம் இழக்காதீர்கள். கடினமான உழைப்பால் கட்டப்பட்ட உறவுகள் பெரும்பாலும் வலுவானவை. 🤝"},
      {emoji:"⚡",title:"பெரிய சவால்!",grade:"D",
        desc:"உங்கள் பெயர் அதிர்வுகள் கிட்டத்தட்ட அனைத்து பரிமாணங்களிலும் குறிப்பிடத்தக்க வேறுபாடுகளை காட்டுகின்றன.",
        advice:"சரியான அர்ப்பணிப்புடன் எந்த உறவும் சாத்தியம். உங்கள் வேறுபாடுகளை வெளிப்படையாக பேசுங்கள். 🌊"},
    ],
  },
};

const LUCKY_DAYS = {
  ms:["Jumaat","Ahad","Rabu","Khamis","Sabtu","Selasa","Isnin"],
  en:["Friday","Sunday","Wednesday","Thursday","Saturday","Tuesday","Monday"],
  zh:["星期五","星期天","星期三","星期四","星期六","星期二","星期一"],
  ta:["வெள்ளி","ஞாயிறு","புதன்","வியாழன்","சனி","செவ்வாய்","திங்கள்"],
};
const LUCKY_COLORS = {
  ms:["Merah Ros","Emas","Lembayung","Sage","Biru Laut","Koral","Champagne"],
  en:["Rose Red","Gold","Lavender","Sage","Navy Blue","Coral","Champagne"],
  zh:["玫瑰红","金色","薰衣草","鼠尾草绿","深蓝","珊瑚","香槟"],
  ta:["ரோஜா சிவப்பு","தங்கம்","லாவெண்டர்","சேஜ்","கடல் நீலம்","பவளம்","சாம்பேன்"],
};
const LUCKY_GEMS = {
  ms:["Rubi","Rose Quartz","Zamrud","Safir","Mutiara","Amethyst","Opal"],
  en:["Ruby","Rose Quartz","Emerald","Sapphire","Pearl","Amethyst","Opal"],
  zh:["红宝石","玫瑰石英","祖母绿","蓝宝石","珍珠","紫水晶","蛋白石"],
  ta:["மாணிக்கம்","ரோஸ் குவார்ட்ஸ்","மரகதம்","நீலம்","முத்து","அமெதிஸ்ட்","ஓபல்"],
};
const LUCKY_MONTHS = {
  ms:["Februari","April","Jun","Ogos","Oktober","Disember","Mac"],
  en:["February","April","June","August","October","December","March"],
  zh:["二月","四月","六月","八月","十月","十二月","三月"],
  ta:["பிப்ரவரி","ஏப்ரல்","ஜூன்","ஆகஸ்ட்","அக்டோபர்","டிசம்பர்","மார்ச்"],
};

// ─── SOUND ───────────────────────────────────────────────────────────────────
function playTone(freq,type="sine",dur=0.15,vol=0.18,delay=0){
  try{const ctx=new(window.AudioContext||window.webkitAudioContext)();const osc=ctx.createOscillator(),gain=ctx.createGain();osc.connect(gain);gain.connect(ctx.destination);osc.type=type;osc.frequency.value=freq;gain.gain.setValueAtTime(0,ctx.currentTime+delay);gain.gain.linearRampToValueAtTime(vol,ctx.currentTime+delay+0.02);gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+delay+dur);osc.start(ctx.currentTime+delay);osc.stop(ctx.currentTime+delay+dur+0.05);}catch(e){}
}
function playChime(){[523,659,784,1047].forEach((f,i)=>playTone(f,"sine",0.4,0.12,i*0.12));}
function playReveal(score){const n=score>=85?[784,880,1047,1175,1319]:score>=70?[659,784,880,1047]:score>=55?[523,587,659,698]:[392,440,494];n.forEach((f,i)=>playTone(f,"triangle",0.35,0.13,i*0.1));}
function playClick(){playTone(880,"sine",0.08,0.1);}
function playCopy(){[1047,1319].forEach((f,i)=>playTone(f,"sine",0.15,0.1,i*0.08));}

// ─── ALGORITHM ───────────────────────────────────────────────────────────────
const PYTH={a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8};
const CHALDEAN={a:1,b:2,c:3,d:4,e:5,f:8,g:3,h:5,i:1,j:1,k:2,l:3,m:4,n:5,o:7,p:8,q:1,r:2,s:3,t:4,u:6,v:6,w:6,x:5,y:1,z:7};
const VOWELS=new Set(['a','e','i','o','u']);
const MASTER=new Set([11,22,33]);
function reduce(n){if(MASTER.has(n))return n;while(n>9){n=String(n).split("").reduce((a,b)=>+a+ +b,0);if(MASTER.has(n))break;}return n;}
function reduceHard(n){while(n>9)n=String(n).split("").reduce((a,b)=>+a+ +b,0);return n;}
function clean(name){return name.toLowerCase().replace(/[^a-z]/g,"");}
function getDNA(name){
  const s=clean(name);if(!s.length)return{expr:1,soul:1,persona:1,chaldean:1,initial:1,vibration:1,len:1};
  const expr=reduce(s.split("").reduce((sum,c)=>sum+(PYTH[c]||0),0));
  const vowels=s.split("").filter(c=>VOWELS.has(c));
  const soul=reduce(vowels.reduce((sum,c)=>sum+(PYTH[c]||0),0)||9);
  const cons=s.split("").filter(c=>!VOWELS.has(c)&&PYTH[c]);
  const persona=reduce(cons.reduce((sum,c)=>sum+(PYTH[c]||0),0)||1);
  const chaldean=reduce(s.split("").reduce((sum,c)=>sum+(CHALDEAN[c]||0),0));
  const first=PYTH[s[0]]||1,last=PYTH[s[s.length-1]]||1,mid=s.length>2?(PYTH[s[Math.floor(s.length/2)]]||1):5;
  const initial=reduceHard(first*3+last*2+mid);
  const vibration=reduceHard(s.split("").reduce((sum,c,i)=>sum+(PYTH[c]||0)*(i%2===0?1:-1),0)+45);
  return{expr,soul,persona,chaldean,initial,vibration,len:s.length};
}
const HM=[[0,9,5,6,8,7,4,3,6,2],[0,9,4,7,8,6,5,3,8,4],[0,4,9,6,5,7,8,4,2,6],[0,7,6,9,4,5,8,7,3,8],[0,8,5,4,9,6,3,7,8,5],[0,6,7,5,6,9,4,8,5,7],[0,5,8,8,3,4,9,6,7,4],[0,3,4,7,7,8,6,9,5,8],[0,8,2,3,8,5,7,5,9,6],[0,4,6,8,5,7,4,8,6,9]];
function harmony(a,b){return HM[Math.min(reduceHard(a),9)][Math.min(reduceHard(b),9)]||5;}
function bellCurve(raw,mean,spread){const normalized=(raw-50)/spread;const curved=mean+(normalized*spread*0.7);return Math.max(30,Math.min(99,Math.round(curved)));}
function calcAll(name1,name2,lang){
  const d1=getDNA(name1),d2=getDNA(name2);
  const mBonus=[d1.expr,d1.soul,d2.expr,d2.soul].filter(n=>MASTER.has(n)).length*4;
  const scores={
    komunikasi: bellCurve(((harmony(d1.expr,d2.expr)*4+harmony(d1.soul,d2.persona)*3+harmony(d1.persona,d2.soul)*3)/10)*10+(Math.abs(d1.len-d2.len)>6?-8:0),70,18),
    keserasian: bellCurve(((harmony(d1.chaldean,d2.chaldean)*5+harmony(d1.expr,d2.soul)*2.5+harmony(d1.soul,d2.expr)*2.5)/10)*10+(d1.expr===d2.expr?(d1.expr%2===0?5:-5):0),68,20),
    tarikan:    bellCurve(((harmony(d1.vibration,d2.vibration)*3+harmony(d1.initial,d2.initial)*4+harmony(d1.initial,d2.vibration)*3)/10)*10+((Math.abs(d1.vibration-d2.vibration)>=3&&Math.abs(d1.vibration-d2.vibration)<=5)?6:0),72,17),
    masaDepan:  bellCurve(((harmony(d1.persona,d2.persona)*4+harmony(reduceHard(d1.expr+d2.expr),6)*3+harmony(reduceHard(d1.expr+d2.expr),9)*3)/10)*10+(([2,4,6,8].includes(reduceHard(d1.persona))&&[2,4,6,8].includes(reduceHard(d2.persona)))?7:0),67,19),
    kefahaman:  bellCurve(((harmony(d1.soul,d2.soul)*5+harmony(d1.chaldean,d2.soul)*2.5+harmony(d1.soul,d2.chaldean)*2.5)/10)*10+(([2,7].includes(reduceHard(d1.soul))||[2,7].includes(reduceHard(d2.soul)))?5:0),69,18),
    keseronokan:bellCurve(((harmony(d1.vibration,d2.initial)*4+harmony(d1.initial,d2.vibration)*4+harmony(d1.persona,d2.persona)*2)/10)*10+([d1.vibration,d2.vibration,d1.initial,d2.initial].filter(n=>[1,3,5,9].includes(reduceHard(n))).length*2),71,16),
    kestabilan: bellCurve(((harmony(d1.expr,d2.chaldean)*4+harmony(d1.chaldean,d2.expr)*4+harmony(d1.persona,d2.chaldean)*2)/10)*10+(([4,8].includes(reduceHard(d1.expr))||[4,8].includes(reduceHard(d2.expr)))?6:0),66,20),
    kelembutan: bellCurve(((harmony(d1.soul,d2.chaldean)*3+harmony(d1.chaldean,d2.soul)*3+harmony(d1.soul,d2.soul)*4)/10)*10+(([2,6].includes(reduceHard(d1.soul))||[2,6].includes(reduceHard(d2.soul)))?7:0),70,17),
  };
  const keys=Object.keys(scores);
  const W={komunikasi:.18,keserasian:.18,tarikan:.12,masaDepan:.15,kefahaman:.14,keseronokan:.10,kestabilan:.08,kelembutan:.05};
  const weighted=Math.min(99,Math.round(keys.reduce((s,k)=>s+scores[k]*W[k],0)+mBonus));
  const t=T[lang];
  const cats=t.cats.map((c,i)=>({...c,score:scores[keys[i]],key:keys[i]}));
  const sorted=[...cats].sort((a,b)=>b.score-a.score);
  const lifeNum=reduceHard(d1.expr+d2.expr),soulNum=reduceHard(d1.soul+d2.soul);
  return{
    cats,avg:weighted,d1,d2,lifeNum,soulNum,
    strength:sorted[0],weakness:sorted[sorted.length-1],
    hasMaster:[...Object.values(d1),...Object.values(d2)].some(v=>MASTER.has(v)),
    lDay:LUCKY_DAYS[lang][lifeNum%7],
    lColor:LUCKY_COLORS[lang][(d1.expr+d2.expr)%7],
    lGem:LUCKY_GEMS[lang][d2.soul%7],
    lMonth:LUCKY_MONTHS[lang][soulNum%7],
  };
}
function getVerdict(score,lang){
  const t=T[lang];
  if(score>=88)return t.verdicts[0];
  if(score>=75)return t.verdicts[1];
  if(score>=62)return t.verdicts[2];
  if(score>=48)return t.verdicts[3];
  return t.verdicts[4];
}

// ─── THEME ───────────────────────────────────────────────────────────────────
const LIGHT={
  bg:"#fdf6f0",card:"#ffffff",cardBorder:"#f2c4ce88",
  input:"#fdf6f0",inputBorder:"#f2c4ce",text:"#2a1a1f",
  subtext:"#6b4c55",muted:"#b08090",
  accent:"#c0445a",accentLight:"#e8708a",gold:"#c9a96e",
  catBg:"#fdf6f0",catBorder:"#f2e0e4",
  barBg:"#fce4ec",luckyBg:"white",luckyBorder:"#f2e4e8",
  adviceBg:"linear-gradient(135deg,#fdf0e8,#fdf6f0)",adviceBorder:"#f2e0d4",
  numeBg:"#fdf6f0",numeBorder:"#f2e0e4",
  strengthBg:"linear-gradient(135deg,#f0faf0,#fdf6f0)",strengthBorder:"#c8e8c8",
  weakBg:"linear-gradient(135deg,#fdf6f0,#fef0e0)",weakBorder:"#e8d0a0",
  masterBg:"linear-gradient(135deg,#fff9e6,#fdf6f0)",masterBorder:"#f0d080",
  luckySectionBg:"linear-gradient(135deg,#fdf0e8,#fce4ec)",luckySectionBorder:"#f2d4c4",
  toggle:"#f2c4ce",toggleText:"#c0445a",
};
const DARK={
  bg:"#1a0f14",card:"#2a1520",cardBorder:"#6b2a3a88",
  input:"#1f1018",inputBorder:"#6b2a3a",text:"#f5e6ea",
  subtext:"#d4a0b0",muted:"#8a5a6a",
  accent:"#e8708a",accentLight:"#f29ab0",gold:"#e8c882",
  catBg:"#231218",catBorder:"#4a2030",
  barBg:"#3a1a28",luckyBg:"#231218",luckyBorder:"#4a2030",
  adviceBg:"linear-gradient(135deg,#2a1a10,#231218)",adviceBorder:"#4a2a1a",
  numeBg:"#231218",numeBorder:"#4a2030",
  strengthBg:"linear-gradient(135deg,#102010,#1a1210)",strengthBorder:"#204820",
  weakBg:"linear-gradient(135deg,#1a1208,#201408)",weakBorder:"#4a3810",
  masterBg:"linear-gradient(135deg,#2a2208,#231a04)",masterBorder:"#6a5810",
  luckySectionBg:"linear-gradient(135deg,#2a1a10,#3a1a28)",luckySectionBorder:"#6a2a3a",
  toggle:"#3a1520",toggleText:"#e8708a",
};

// ─── CONFETTI ────────────────────────────────────────────────────────────────
function Confetti({active}){
  const colors=["#c0445a","#e8708a","#c9a96e","#f2c4ce","#fce4ec","#ff6b9d","#ffb347","#87ceeb"];
  if(!active)return null;
  const pieces=Array.from({length:80},(_,i)=>({id:i,x:Math.random()*100,color:colors[i%colors.length],delay:Math.random()*1.2}));
  return(<><style>{`@keyframes cf{0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(100vh) rotate(720deg)}}`}</style>{pieces.map(p=><div key={p.id} style={{position:"fixed",left:`${p.x}%`,top:"-20px",width:7,height:7,background:p.color,borderRadius:"50%",opacity:0,pointerEvents:"none",zIndex:9999,animation:`cf ${2.5+Math.random()*2}s ${p.delay}s ease-in forwards`}}/>)}</>);
}

function Petals({dark}){
  const chars=["🌸","🌺","💮","🌷","🌹","✿","💐"];
  return(<div style={{position:"fixed",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>
    <style>{`@keyframes pt{0%{transform:translateY(-40px) rotate(0deg);opacity:.55}100%{transform:translateY(110vh) rotate(400deg);opacity:0}}`}</style>
    {Array.from({length:12},(_,i)=>(
      <div key={i} style={{position:"absolute",top:"-40px",left:`${(i*8.5)%100}%`,fontSize:`${0.7+(i%4)*0.2}rem`,opacity:dark?0.2:0.35,animation:`pt ${8+(i%5)*1.8}s ${(i%9)*1.3}s linear infinite`}}>{chars[i%chars.length]}</div>
    ))}
  </div>);
}

function Ring({animScore,grade,th}){
  const r=55,circ=2*Math.PI*r;
  const color=grade==="A+"?th.accent:grade==="A"?th.accentLight:grade==="B"?th.gold:grade==="C"?"#7a9e7e":"#8b6914";
  return(<svg viewBox="0 0 140 140" width="140" height="140" style={{transform:"rotate(-90deg)"}}>
    <defs><linearGradient id="rg4" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={color}/><stop offset="100%" stopColor={th.accentLight}/></linearGradient></defs>
    <circle cx="70" cy="70" r={r} fill="none" stroke={th.barBg} strokeWidth="11"/>
    <circle cx="70" cy="70" r={r} fill="none" stroke="url(#rg4)" strokeWidth="11" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ-(animScore/100)*circ} style={{transition:"stroke-dashoffset 2s cubic-bezier(.4,0,.2,1)"}}/>
  </svg>);
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [lang,setLang]=useState("ms");
  const [dark,setDark]=useState(false);
  const [name1,setName1]=useState("");
  const [name2,setName2]=useState("");
  const [result,setResult]=useState(null);
  const [verdict,setVerdict]=useState(null);
  const [animScore,setAnimScore]=useState(0);
  const [barsAnim,setBarsAnim]=useState(false);
  const [luckyAnim,setLuckyAnim]=useState(false);
  const [confetti,setConfetti]=useState(false);
  const [showShare,setShowShare]=useState(false);
  const [phase,setPhase]=useState("input");
  const [showDetail,setShowDetail]=useState(null);
  const [copied,setCopied]=useState(false);
  const animRef=useRef(null);
  const th=dark?DARK:LIGHT;
  const t=T[lang];

  function handleCalc(){
    if(!name1.trim()||!name2.trim())return;
    playClick();
    setPhase("loading");setResult(null);setAnimScore(0);
    setBarsAnim(false);setLuckyAnim(false);setConfetti(false);
    setTimeout(()=>{
      playChime();
      const r=calcAll(name1.trim(),name2.trim(),lang);
      const v=getVerdict(r.avg,lang);
      setResult(r);setVerdict(v);setPhase("result");
      saveToFirebase(name1,name2,r.avg,lang);
      let cur=0;
      clearInterval(animRef.current);
      animRef.current=setInterval(()=>{
        cur=Math.min(cur+1.5,r.avg);setAnimScore(Math.round(cur));
        if(cur>=r.avg){clearInterval(animRef.current);playReveal(r.avg);
          if(r.avg>=75)setTimeout(()=>setConfetti(true),300);
          setTimeout(()=>setConfetti(false),4000);}
      },25);
      setTimeout(()=>setBarsAnim(true),600);
      setTimeout(()=>setLuckyAnim(true),2000);
    },1200);
  }

  function handleReset(){playClick();setPhase("input");setResult(null);setAnimScore(0);setConfetti(false);setShowDetail(null);}

  function handleCopy(){
    if(!result||!verdict)return;
    const text=`💕 ${t.title}\n\n${name1.trim()} ❤️ ${name2.trim()}\n\n${t.shareScore}: ${result.avg}% (${t.grade} ${verdict.grade})\n${verdict.emoji} ${verdict.title}\n\n${t.shareStrength}: ${result.strength.label} (${result.strength.score}%)\n${t.shareWeakness}: ${result.weakness.label} (${result.weakness.score}%)\n\n${verdict.desc}\n\n🔗 https://Shaqqiem.github.io/ramalan-jodoh/`;
    navigator.clipboard.writeText(text).then(()=>{playCopy();setCopied(true);setTimeout(()=>setCopied(false),2500);});
  }

  const canCalc=name1.trim().length>1&&name2.trim().length>1;
  const numeLabels=t.numeLabels;
  const numeDesc=t.numeDesc;
  const numeDesc2=t.numeDesc2;

  return(
    <div style={{minHeight:"100vh",background:th.bg,display:"flex",alignItems:"flex-start",justifyContent:"center",fontFamily:"Georgia,'Times New Roman',serif",position:"relative",padding:"16px 0 40px",transition:"background .3s"}}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.22)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        input::placeholder{color:${th.muted};}
        input:focus{outline:none;border-color:${th.accent}!important;box-shadow:0 0 0 3px ${th.accent}33;}
        .catbar:hover{filter:brightness(1.08);cursor:pointer;transform:translateX(2px);}
        .catbar{transition:all .2s;}
        .langbtn:hover{opacity:.8;}
        * {box-sizing:border-box;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:${th.inputBorder};border-radius:4px;}
      `}</style>

      <Petals dark={dark}/>
      <Confetti active={confetti}/>

      {/* BG blobs */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,
        background:dark
          ?"radial-gradient(ellipse at 10% 20%,#6b0a1a22 0%,transparent 50%),radial-gradient(ellipse at 90% 80%,#3a0a2a22 0%,transparent 50%)"
          :"radial-gradient(ellipse at 10% 20%,#f7d4dc44 0%,transparent 50%),radial-gradient(ellipse at 90% 80%,#fce4ec55 0%,transparent 50%)"}}/>

      {/* Detail modal */}
      {showDetail&&(
        <div style={{position:"fixed",inset:0,background:"#0009",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setShowDetail(null)}>
          <div style={{background:th.card,borderRadius:20,padding:"24px 20px",maxWidth:340,width:"100%",boxShadow:"0 20px 60px #0006",border:`1px solid ${th.catBorder}`}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:"1.2rem",color:th.text,marginBottom:6}}>{showDetail.label}</div>
            <div style={{fontSize:"2rem",fontFamily:"Georgia,serif",fontWeight:"bold",color:th.accent,marginBottom:8}}>{showDetail.score}%</div>
            <div style={{fontSize:"0.82rem",lineHeight:1.7,color:th.subtext,marginBottom:10}}>{showDetail.desc}</div>
            <div style={{fontSize:"0.68rem",color:th.muted,textAlign:"right",marginBottom:12}}>{t.grade} weight: {showDetail.weight}</div>
            <button onClick={()=>setShowDetail(null)} style={{width:"100%",padding:"10px",borderRadius:50,background:th.barBg,color:th.accent,border:`1px solid ${th.inputBorder}`,cursor:"pointer",fontFamily:"Georgia,serif",fontSize:"0.9rem"}}>
              {t.close}
            </button>
          </div>
        </div>
      )}

      {/* Share modal */}
      {showShare&&result&&verdict&&(
        <div style={{position:"fixed",inset:0,background:"#0009",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setShowShare(false)}>
          <div style={{background:th.card,borderRadius:24,padding:"28px 22px",maxWidth:370,width:"100%",boxShadow:"0 30px 80px #0006",border:`1.5px solid ${th.inputBorder}`,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
            <div style={{textAlign:"center",marginBottom:16}}>
              <div style={{fontSize:"0.68rem",color:th.gold,letterSpacing:3,textTransform:"uppercase",marginBottom:4}}>{t.shareTitle}</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:"1.9rem",fontStyle:"italic",color:th.accent}}>{result.avg}% <span style={{fontSize:"0.9rem",background:th.barBg,padding:"2px 10px",borderRadius:99,color:th.accent}}>{verdict.grade}</span></div>
              <div style={{fontSize:"1rem",fontFamily:"Georgia,serif",fontStyle:"italic",color:th.subtext,margin:"4px 0"}}>{verdict.emoji} {verdict.title}</div>
              <div style={{fontSize:"0.85rem",color:th.text,fontWeight:"bold"}}>{name1.trim()} ❤️ {name2.trim()}</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
              <div style={{background:th.catBg,borderRadius:10,padding:"10px",textAlign:"center",border:`1px solid ${th.catBorder}`}}>
                <div style={{fontSize:"0.65rem",color:th.muted,textTransform:"uppercase",marginBottom:2}}>{t.shareStrength}</div>
                <div style={{fontSize:"0.8rem",fontWeight:"bold",color:th.accent}}>{result.strength.label}</div>
                <div style={{fontSize:"1rem",color:th.accent,fontWeight:"bold"}}>{result.strength.score}%</div>
              </div>
              <div style={{background:th.catBg,borderRadius:10,padding:"10px",textAlign:"center",border:`1px solid ${th.catBorder}`}}>
                <div style={{fontSize:"0.65rem",color:th.muted,textTransform:"uppercase",marginBottom:2}}>{t.shareWeakness}</div>
                <div style={{fontSize:"0.8rem",fontWeight:"bold",color:th.gold}}>{result.weakness.label}</div>
                <div style={{fontSize:"1rem",color:th.gold,fontWeight:"bold"}}>{result.weakness.score}%</div>
              </div>
            </div>
            <div style={{background:th.adviceBg,borderRadius:12,padding:"12px 14px",marginBottom:14,border:`1px solid ${th.adviceBorder}`,fontSize:"0.8rem",lineHeight:1.7,color:th.subtext,fontStyle:"italic"}}>
              "{verdict.desc}"
            </div>
            <button onClick={handleCopy} style={{width:"100%",padding:"13px",borderRadius:50,background:copied?"#7a9e7e":`linear-gradient(135deg,${th.accentLight},${th.accent})`,color:"white",border:"none",fontSize:"0.95rem",fontFamily:"Georgia,serif",fontStyle:"italic",cursor:"pointer",marginBottom:8,transition:"all .3s"}}>
              {copied?t.copied:t.copyBtn}
            </button>
            <button onClick={()=>setShowShare(false)} style={{width:"100%",padding:"10px",borderRadius:50,background:"transparent",color:th.muted,border:`1.5px solid ${th.inputBorder}`,fontSize:"0.85rem",cursor:"pointer",fontFamily:"Georgia,serif"}}>
              {t.close}
            </button>
          </div>
        </div>
      )}

      {/* MAIN CARD */}
      <div style={{position:"relative",zIndex:1,background:th.card,borderRadius:28,padding:"32px 24px",maxWidth:500,width:"94%",boxShadow:dark?"0 20px 60px #00000066":"0 20px 60px #c0445a1a,0 4px 20px #0000000d",border:`1.5px solid ${th.cardBorder}`,marginTop:8,animation:"fadeUp .7s cubic-bezier(.4,0,.2,1) both",transition:"background .3s, border .3s"}}>

        {/* TOP BAR — Lang + Dark mode */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          {/* Language switcher */}
          <div style={{display:"flex",gap:4}}>
            {Object.keys(T).map(l=>(
              <button key={l} className="langbtn" onClick={()=>{playClick();setLang(l);}}
                style={{padding:"4px 8px",borderRadius:8,border:`1px solid ${lang===l?th.accent:th.inputBorder}`,background:lang===l?th.accent:"transparent",color:lang===l?"white":th.muted,fontSize:"0.65rem",cursor:"pointer",fontFamily:"Georgia,serif",transition:"all .2s"}}>
                {T[l].flag} {T[l].label}
              </button>
            ))}
          </div>
          {/* Dark mode toggle */}
          <button onClick={()=>{playClick();setDark(!dark);}}
            style={{padding:"6px 12px",borderRadius:50,border:`1px solid ${th.inputBorder}`,background:th.toggle,color:th.toggleText,fontSize:"0.8rem",cursor:"pointer",transition:"all .3s"}}>
            {dark?"☀️ Light":"🌙 Dark"}
          </button>
        </div>

        {/* HEADER */}
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{color:th.gold,fontSize:"1.2rem",letterSpacing:8,opacity:.7,marginBottom:4}}>— ✦ —</div>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:"1.65rem",color:th.accent,fontStyle:"italic",margin:0,marginBottom:2}}>{t.title}</h1>
          <div style={{fontSize:"0.65rem",color:th.muted,letterSpacing:2.5,textTransform:"uppercase"}}>{t.subtitle}</div>
        </div>

        {/* INPUT */}
        {phase==="input"&&(
          <div style={{animation:"fadeUp .5s both"}}>
            <div style={{marginBottom:10}}>
              <label style={{fontSize:"0.7rem",color:th.muted,letterSpacing:1.5,textTransform:"uppercase",display:"block",marginBottom:5}}>✦ {t.name1}</label>
              <input value={name1} onChange={e=>setName1(e.target.value)} placeholder={t.ph1} onKeyDown={e=>e.key==="Enter"&&handleCalc()}
                style={{width:"100%",padding:"13px 16px",borderRadius:14,border:`1.5px solid ${th.inputBorder}`,background:th.input,fontSize:"1rem",color:th.text,fontFamily:"Georgia,serif",transition:"all .2s"}}/>
            </div>
            <div style={{textAlign:"center",fontSize:"1.5rem",margin:"8px 0",animation:"pulse 1.5s ease-in-out infinite"}}>💗</div>
            <div style={{marginBottom:20}}>
              <label style={{fontSize:"0.7rem",color:th.muted,letterSpacing:1.5,textTransform:"uppercase",display:"block",marginBottom:5}}>✦ {t.name2}</label>
              <input value={name2} onChange={e=>setName2(e.target.value)} placeholder={t.ph2} onKeyDown={e=>e.key==="Enter"&&handleCalc()}
                style={{width:"100%",padding:"13px 16px",borderRadius:14,border:`1.5px solid ${th.inputBorder}`,background:th.input,fontSize:"1rem",color:th.text,fontFamily:"Georgia,serif",transition:"all .2s"}}/>
            </div>
            <button onClick={handleCalc} disabled={!canCalc}
              style={{width:"100%",padding:"15px",borderRadius:50,background:canCalc?`linear-gradient(135deg,${th.accentLight},${th.accent})`:th.barBg,color:canCalc?"white":th.muted,border:"none",fontSize:"1rem",fontFamily:"Georgia,serif",fontStyle:"italic",cursor:canCalc?"pointer":"not-allowed",boxShadow:canCalc?`0 6px 20px ${th.accent}44`:"none",transition:"all .3s"}}>
              {t.btn}
            </button>
            <div style={{textAlign:"center",fontSize:"0.65rem",color:th.muted,marginTop:10,fontStyle:"italic"}}>{t.hint}</div>
          </div>
        )}

        {/* LOADING */}
        {phase==="loading"&&(
          <div style={{textAlign:"center",padding:"40px 0",animation:"fadeUp .4s both"}}>
            <div style={{fontSize:"2.5rem",animation:"spin 1.2s linear infinite",display:"inline-block",marginBottom:16}}>🔮</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:"1.1rem",color:th.accent,fontStyle:"italic",marginBottom:12}}>{t.loading}</div>
            {t.loadingDesc.map((d,i)=>(
              <div key={i} style={{fontSize:"0.72rem",color:th.muted,marginBottom:4,animation:`fadeUp .4s ${i*.15}s both`}}>• {d}</div>
            ))}
            <div style={{marginTop:20,display:"flex",justifyContent:"center",gap:8}}>
              {[0,1,2].map(i=>(<div key={i} style={{width:8,height:8,borderRadius:"50%",background:th.accent,animation:`bounce 1s ${i*.2}s ease-in-out infinite`}}/>))}
            </div>
          </div>
        )}

        {/* RESULT */}
        {phase==="result"&&result&&verdict&&(
          <div style={{animation:"fadeUp .6s both"}}>
            {/* Names */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:20,flexWrap:"wrap"}}>
              <div style={{background:th.barBg,border:`1px solid ${th.inputBorder}`,borderRadius:50,padding:"8px 16px",fontFamily:"Georgia,serif",fontSize:"0.88rem",color:th.subtext,fontWeight:"bold",maxWidth:155,textAlign:"center"}}>{name1.trim()}</div>
              <div style={{fontSize:"1.3rem",animation:"pulse 1.4s ease-in-out infinite"}}>💗</div>
              <div style={{background:th.barBg,border:`1px solid ${th.inputBorder}`,borderRadius:50,padding:"8px 16px",fontFamily:"Georgia,serif",fontSize:"0.88rem",color:th.subtext,fontWeight:"bold",maxWidth:155,textAlign:"center"}}>{name2.trim()}</div>
            </div>

            {/* Ring */}
            <div style={{position:"relative",width:140,height:140,margin:"0 auto 14px"}}>
              <Ring animScore={animScore} grade={verdict.grade} th={th}/>
              <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <div style={{fontFamily:"Georgia,serif",fontSize:"2.6rem",fontWeight:"bold",color:th.accent,lineHeight:1}}>{animScore}</div>
                <div style={{fontSize:"0.6rem",color:th.gold,letterSpacing:1,textTransform:"uppercase"}}>{t.pct}</div>
              </div>
            </div>

            {/* Verdict */}
            <div style={{textAlign:"center",marginBottom:14}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`linear-gradient(135deg,${th.accent},${th.accentLight})`,color:"white",fontFamily:"Georgia,serif",fontSize:"1rem",fontStyle:"italic",padding:"8px 20px",borderRadius:50,boxShadow:`0 4px 18px ${th.accent}44`,marginBottom:12}}>
                {verdict.emoji} {verdict.title}
                <span style={{background:"rgba(255,255,255,0.22)",borderRadius:99,padding:"1px 8px",fontSize:"0.78rem",fontStyle:"normal"}}>{verdict.grade}</span>
              </div>
              <p style={{fontSize:"0.83rem",lineHeight:1.8,color:th.subtext,margin:0,padding:"0 2px"}}>{verdict.desc}</p>
            </div>

            {/* Master alert */}
            {result.hasMaster&&(
              <div style={{background:th.masterBg,borderRadius:12,padding:"10px 14px",marginBottom:12,border:`1px solid ${th.masterBorder}`,textAlign:"center"}}>
                <div style={{fontSize:"0.73rem",color:th.gold,letterSpacing:1}}>⭐ {t.masterAlert}</div>
                <div style={{fontSize:"0.68rem",color:th.muted,marginTop:2}}>{t.masterDesc}</div>
              </div>
            )}

            {/* Strength & Weakness */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
              <div style={{background:th.strengthBg,borderRadius:14,padding:"12px",border:`1px solid ${th.strengthBorder}`,textAlign:"center"}}>
                <div style={{fontSize:"0.62rem",color:"#5a8a5a",textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>{t.strength}</div>
                <div style={{fontSize:"0.8rem",fontWeight:"bold",color:th.text}}>{result.strength.label}</div>
                <div style={{fontSize:"1.1rem",fontWeight:"bold",color:"#2a8a2a"}}>{result.strength.score}%</div>
              </div>
              <div style={{background:th.weakBg,borderRadius:14,padding:"12px",border:`1px solid ${th.weakBorder}`,textAlign:"center"}}>
                <div style={{fontSize:"0.62rem",color:"#8a6a30",textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>{t.weakness}</div>
                <div style={{fontSize:"0.8rem",fontWeight:"bold",color:th.text}}>{result.weakness.label}</div>
                <div style={{fontSize:"1.1rem",fontWeight:"bold",color:"#8a6020"}}>{result.weakness.score}%</div>
              </div>
            </div>

            {/* Advice */}
            <div style={{background:th.adviceBg,borderRadius:14,padding:"13px 15px",marginBottom:14,border:`1px solid ${th.adviceBorder}`}}>
              <div style={{fontSize:"0.66rem",color:th.gold,letterSpacing:2,textTransform:"uppercase",marginBottom:5}}>{t.advice}</div>
              <p style={{fontSize:"0.82rem",lineHeight:1.75,color:th.subtext,margin:0,fontStyle:"italic"}}>{verdict.advice}</p>
            </div>

            {/* 8 Categories */}
            <div style={{marginBottom:14}}>
              <div style={{fontSize:"0.66rem",color:th.gold,letterSpacing:2,textTransform:"uppercase",marginBottom:3}}>{t.analysis}</div>
              <div style={{fontSize:"0.61rem",color:th.muted,fontStyle:"italic",marginBottom:8}}>{t.tapHint}</div>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {result.cats.map((cat,i)=>(
                  <div key={i} className="catbar" onClick={()=>setShowDetail(cat)} style={{padding:"8px 10px",borderRadius:10,background:th.catBg,border:`1px solid ${th.catBorder}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                      <span style={{fontSize:"0.77rem",color:th.text}}>{cat.label}</span>
                      <div style={{display:"flex",alignItems:"center",gap:5}}>
                        <span style={{fontSize:"0.65rem",color:th.muted}}>{cat.weight}</span>
                        <span style={{fontSize:"0.77rem",fontWeight:"bold",color:cat.score>=75?th.accent:cat.score>=60?th.gold:"#7a9e7e"}}>{barsAnim?`${cat.score}%`:"—"}</span>
                      </div>
                    </div>
                    <div style={{background:th.barBg,borderRadius:99,height:6,overflow:"hidden"}}>
                      <div style={{height:"100%",background:cat.score>=75?`linear-gradient(90deg,${th.accentLight},${th.accent})`:cat.score>=60?`linear-gradient(90deg,${th.gold},#c9a96e)`:"linear-gradient(90deg,#90c890,#7a9e7e)",borderRadius:99,width:barsAnim?`${cat.score}%`:"0%",transition:`width ${1.6+i*.08}s cubic-bezier(.4,0,.2,1)`}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Numerologi breakdown */}
            <div style={{marginBottom:14}}>
              <div style={{fontSize:"0.66rem",color:th.gold,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>{t.numerology}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                {[
                  [numeLabels[0],result.d1.expr,name1.trim().split(" ")[0],numeDesc[0],numeDesc2[0]],
                  [numeLabels[0],result.d2.expr,name2.trim().split(" ")[0],numeDesc[0],numeDesc2[0]],
                  [numeLabels[1],result.d1.soul,"",numeDesc[1],numeDesc2[1]],
                  [numeLabels[1],result.d2.soul,"",numeDesc[1],numeDesc2[1]],
                  [numeLabels[2],result.d1.persona,"",numeDesc[2],numeDesc2[2]],
                  [numeLabels[2],result.d2.persona,"",numeDesc[2],numeDesc2[2]],
                  [numeLabels[3],result.d1.chaldean,"",numeDesc[3],numeDesc2[3]],
                  [numeLabels[3],result.d2.chaldean,"",numeDesc[3],numeDesc2[3]],
                ].map(([lb,vl,name,sys,desc2],i)=>(
                  <div key={i} style={{background:th.numeBg,borderRadius:10,padding:"8px 10px",border:`1px solid ${th.numeBorder}`}}>
                    <div style={{fontSize:"0.58rem",color:th.gold,letterSpacing:1,textTransform:"uppercase"}}>{lb}</div>
                    <div style={{fontFamily:"Georgia,serif",fontSize:"1.5rem",fontWeight:"bold",color:MASTER.has(vl)?th.gold:th.accent,lineHeight:1.1}}>{vl}{MASTER.has(vl)?"✦":""}</div>
                    <div style={{fontSize:"0.62rem",color:th.muted}}>{name||desc2}</div>
                    <div style={{fontSize:"0.58rem",color:th.muted,opacity:.7}}>{sys}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lucky */}
            <div style={{background:th.luckySectionBg,borderRadius:16,padding:"13px 14px",marginBottom:14,border:`1px solid ${th.luckySectionBorder}`}}>
              <div style={{fontSize:"0.66rem",color:th.gold,textTransform:"uppercase",letterSpacing:2,marginBottom:8,textAlign:"center"}}>{t.lucky}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7}}>
                {[
                  ["🔢",t.luckyLabels[0],luckyAnim?result.lifeNum:"✦"],
                  ["📅",t.luckyLabels[1],luckyAnim?result.lDay:"✦"],
                  ["🌸",t.luckyLabels[2],luckyAnim?result.lColor:"✦"],
                  ["💎",t.luckyLabels[3],luckyAnim?result.lGem:"✦"],
                  ["🗓️",t.luckyLabels[4],luckyAnim?result.lMonth:"✦"],
                  ["💫",t.luckyLabels[5],luckyAnim?result.soulNum:"✦"],
                ].map(([ic,lb,vl])=>(
                  <div key={lb} style={{textAlign:"center",background:th.luckyBg,borderRadius:10,padding:"8px 4px",border:`1px solid ${th.luckyBorder}`}}>
                    <div style={{fontSize:"1rem"}}>{ic}</div>
                    <div style={{fontSize:"0.58rem",color:th.muted,textTransform:"uppercase",letterSpacing:.5,margin:"2px 0"}}>{lb}</div>
                    <div style={{fontSize:"0.76rem",fontWeight:"bold",color:th.subtext}}>{vl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>{playClick();setShowShare(true);}} style={{flex:1,padding:"13px",borderRadius:50,background:`linear-gradient(135deg,${th.gold},#e8c882)`,color:"white",border:"none",fontSize:"0.9rem",fontFamily:"Georgia,serif",fontStyle:"italic",cursor:"pointer",boxShadow:`0 4px 14px ${th.gold}44`}}>
                {t.share}
              </button>
              <button onClick={handleReset} style={{flex:1,padding:"13px",borderRadius:50,background:"transparent",color:th.accent,border:`1.5px solid ${th.accent}`,fontSize:"0.9rem",fontFamily:"Georgia,serif",fontStyle:"italic",cursor:"pointer"}}>
                {t.tryAgain}
              </button>
            </div>

            <div style={{textAlign:"center",fontSize:"0.63rem",color:th.muted,fontStyle:"italic",marginTop:12}}>{t.disclaimer}</div>
          </div>
        )}
      </div>
    </div>
  );
}

