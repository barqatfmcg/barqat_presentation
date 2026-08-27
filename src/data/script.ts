import type { Beat } from '../types/scene';

export const barqatBeats: Beat[] = [
  {
    id: "intro",
    startTime: 0,
    duration: 4,
    camera: {
      position: [0, 8, 8],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "restoreMap"
    },
    overlay: {
      component: "TitleCard",
      props: {
        title: "Barqat",
        subtitle: "B2B2C Execution Plan"
      }
    },
    voiceover: {
      file: "beat_01_intro.mp3",
      subtitleUrdu: "معزز حضرات، خوش آمدید۔ آئیے مل کر برقت کے مکمل عملی منصوبے کا جائزہ لیتے ہیں — بی ٹو بی سے بی ٹو سی تک۔",
      subtitleEnglish: "Distinguished guests, welcome. Let's together review Barqat's complete execution plan — from B2B to B2C."
    }
  },
  {
    id: "shop_appear",
    startTime: 4,
    duration: 6,
    camera: {
      position: [0, 7, 7],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "revealNodes",
      payload: { showShopOnly: true }
    },
    overlay: {
      component: "CriteriaCallout",
      props: {
        step: 1,
        text: "Shop Selection Criteria"
      }
    },
    voiceover: {
      file: "beat_02_shop_appear.mp3",
      subtitleUrdu: "سب سے پہلے، ہمیں ایک مرکزی دکان کا انتخاب کرنا ہے۔ یہ انتخاب دو اہم اصولوں پر مبنی ہوگا۔",
      subtitleEnglish: "First, we need to select a central shop. This selection will be based on two key principles."
    }
  },
  {
    id: "criteria_1",
    startTime: 10,
    duration: 9,
    camera: {
      position: [0, 5, 5],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "drawCircle",
      payload: { isGhost: true }
    },
    overlay: {
      component: "CriteriaCallout",
      props: {
        step: 2,
        title: "1. Area Potential & Early Adopters",
        text: "Area potential for future B2C delivery + Early Adopters profile"
      }
    },
    voiceover: {
      file: "beat_03_criteria_1.mp3",
      subtitleUrdu: "پہلا اصول: علاقے کی صلاحیت۔ ہم ایسی دکان منتخب کریں گے جس کا علاقہ مستقبل میں بی ٹو سی ڈیلیوری کے لیے موزوں ہو، اور جہاں گاہک نئی سہولیات جلد اپنانے کو تیار ہوں — یعنی ارلی ایڈاپٹرز۔",
      subtitleEnglish: "First principle: area potential. We will select a shop whose area is suitable for future B2C delivery, and where customers are ready to quickly adopt new facilities — i.e., early adopters."
    }
  },
  {
    id: "criteria_2",
    startTime: 19,
    duration: 10,
    camera: {
      position: [0, 6, 8],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "highlightRoute",
      payload: { routeId: "main_route" }
    },
    overlay: {
      component: "CriteriaCallout",
      props: {
        step: 3,
        title: "2. Common Distributor Routes",
        text: "Selected based on route commonality (no extra delivery cost)"
      }
    },
    voiceover: {
      file: "beat_04_criteria_2.mp3",
      subtitleUrdu: "دوسرا اصول: مشترکہ تقسیم کار روٹس۔ ہم تمام ڈسٹری بیوٹرز کے روٹس کا تفصیل سے جائزہ لیں گے، اور ایسی دکان منتخب کریں گے جو تمام روٹس کے لیے مشترکہ ہو — تاکہ سامان کسی اضافی لاگت کے بغیر دکان تک پہنچے۔",
      subtitleEnglish: "Second principle: common distributor routes. We will thoroughly review all distributors' routes and select a shop that is common to all routes — so goods reach the shop without any extra cost."
    }
  },
  {
    id: "tech_transition",
    startTime: 29,
    duration: 4,
    camera: {
      position: [0, 8, 8],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "dimMap"
    },
    overlay: {
      component: "TitleCard",
      props: {
        title: "Technology Integration",
        subtitle: "Connecting Retailers via WhatsApp Gateway"
      }
    },
    voiceover: {
      file: "beat_05_tech_transition.mp3",
      subtitleUrdu: "دکان کے انتخاب کے بعد، اگلا مرحلہ ہے ٹیکنالوجی کا انضمام۔",
      subtitleEnglish: "After shop selection, the next phase is technology integration."
    }
  },
  {
    id: "tech_benefits",
    startTime: 33,
    duration: 14,
    camera: {
      position: [0, 8, 8],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "dimMap"
    },
    overlay: {
      component: "BenefitCards",
      props: {
        benefits: [
          { title: "Ease of Use", desc: "No complex catalogs or apps needed" },
          { title: "Urdu Voice Notes", desc: "Speak directly to place orders" },
          { title: "Zero Education Barrier", desc: "Retailers use existing habits" },
          { title: "Frictionless Onboarding", desc: "Instant start with no login required" }
        ]
      }
    },
    voiceover: {
      file: "beat_06_tech_benefits.mp3",
      subtitleUrdu: "برقت بی ٹو بی ایپ پہلے سے موجود ہے، لیکن ہم ایک اور آسان حل تجویز کرتے ہیں: واٹس ایپ گیٹ وے۔ اس کے چار بڑے فوائد ہیں — پہلا، استعمال میں آسانی، کوئی پیچیدہ کیٹلاگ نہیں۔ دوسرا، اردو صوتی پیغام کی سہولت۔ تیسرا، دکاندار کو کسی تربیت کی ضرورت نہیں۔ اور چوتھا، بغیر کسی رکاوٹ کے فوری آن بورڈنگ۔",
      subtitleEnglish: "Barqat B2B app already exists, but we propose another easy solution: WhatsApp gateway. It has four major benefits — first, ease of use, no complex catalog. Second, Urdu voice message facility. Third, retailer needs no training. And fourth, instant onboarding without friction."
    }
  },
  {
    id: "video_1_trigger",
    startTime: 47,
    duration: 3,
    camera: {
      position: [0, 8, 8],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "dimMap"
    },
    overlay: {
      component: "VideoTrigger",
      props: {
        videoUrl: "https://pub-f6f4f98825164093955ff2dfc7327a8b.r2.dev/agent_demo.mp4",
        text: "Watch: WhatsApp Order Demo"
      }
    },
    pausesTimeline: true,
    voiceover: {
      file: "beat_07_video_1_trigger.mp3",
      subtitleUrdu: "آئیے، واٹس ایپ پر آرڈر دینے کا یہ عملی ڈیمو دیکھتے ہیں۔",
      subtitleEnglish: "Let's watch a practical demo of placing an order on WhatsApp."
    }
  },
  {
    id: "video_2_trigger",
    startTime: 50,
    duration: 4,
    camera: {
      position: [0, 8, 8],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "dimMap"
    },
    overlay: {
      component: "VideoTrigger",
      props: {
        videoUrl: "https://pub-f6f4f98825164093955ff2dfc7327a8b.r2.dev/grocery_agent_benefits.mp4",
        text: "Watch: AI Gateway Benefits"
      }
    },
    pausesTimeline: true,
    voiceover: {
      file: "beat_08_video_2_trigger.mp3",
      subtitleUrdu: "اب دیکھتے ہیں کہ مصنوعی ذہانت پر مبنی یہ واٹس ایپ گیٹ وے کیسے فوائد فراہم کرتا ہے۔",
      subtitleEnglish: "Now let's see how this AI-based WhatsApp gateway provides benefits."
    }
  },
  {
    id: "return_main",
    startTime: 54,
    duration: 4,
    camera: {
      position: [0, 7, 7],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "restoreMap"
    },
    voiceover: {
      file: "beat_09_return_main.mp3",
      subtitleUrdu: "بہترین۔ اب واپس اپنے مرکزی منصوبے کی طرف چلتے ہیں۔",
      subtitleEnglish: "Excellent. Now let's return to our main plan."
    }
  },
  {
    id: "checklist_1",
    startTime: 58,
    duration: 7,
    camera: {
      position: [0, 7, 7],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "restoreMap"
    },
    overlay: {
      component: "Checklist",
      props: {
        items: [
          { label: "Shop setup complete", checked: true },
          { label: "Tech Stack integrated", checked: true },
          { label: "Replenishment routing active", checked: false }
        ]
      }
    },
    voiceover: {
      file: "beat_10_checklist_1.mp3",
      subtitleUrdu: "اس مرحلے تک، دو اہم کام مکمل ہو چکے ہیں: دکان کا قیام، اور ٹیکنالوجی کا انضمام۔",
      subtitleEnglish: "By this stage, two important tasks are complete: shop setup, and technology integration."
    }
  },
  {
    id: "replenish_routing",
    startTime: 65,
    duration: 9,
    camera: {
      position: [0, 9, 9],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "flowParticles",
      payload: { active: true }
    },
    voiceover: {
      file: "beat_11_replenish_routing.mp3",
      subtitleUrdu: "اب آتے ہیں عملی نفاذ کی طرف۔ مختلف تقسیم کاروں کے گوداموں سے سامان اسی منتخب شدہ دکان کی طرف روانہ کیا جاتا ہے — بارہ مختلف مقامات سے، ایک ساتھ۔",
      subtitleEnglish: "Now we come to practical execution. Goods are dispatched from different distributors' warehouses toward this selected shop — from twelve different locations, simultaneously."
    }
  },
  {
    id: "replenished",
    startTime: 74,
    duration: 3,
    camera: {
      position: [0, 6, 6],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "highlightRoute",
      payload: { replenished: true }
    },
    overlay: {
      component: "Checklist",
      props: {
        items: [
          { label: "Shop setup complete", checked: true },
          { label: "Tech Stack integrated", checked: true },
          { label: "Replenishment routing active", checked: true }
        ]
      }
    },
    voiceover: {
      file: "beat_12_replenished.mp3",
      subtitleUrdu: "اور دیکھیں — دکان مکمل طور پر بھر چکی ہے۔",
      subtitleEnglish: "And see — the shop is fully replenished."
    }
  },
  {
    id: "b2b_to_b2c",
    startTime: 77,
    duration: 5,
    camera: {
      position: [0, 7, 7],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "restoreMap"
    },
    overlay: {
      component: "TitleCard",
      props: {
        title: "Fleetless B2C Barqat Plan",
        subtitle: "Leveraging local networks for delivery"
      }
    },
    voiceover: {
      file: "beat_13_b2b_to_b2c.mp3",
      subtitleUrdu: "اب ہم بی ٹو بی سے بی ٹو سی کی طرف بڑھتے ہیں — فلیٹ لیس برقت پلان۔",
      subtitleEnglish: "Now we move from B2B to B2C — the Fleetless Barqat Plan."
    }
  },
  {
    id: "radius_reveal",
    startTime: 82,
    duration: 5,
    camera: {
      position: [0, 8, 8],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "drawCircle",
      payload: { radiusKm: 1, active: true }
    },
    voiceover: {
      file: "beat_14_radius_reveal.mp3",
      subtitleUrdu: "ہر برقت دکان ایک کلومیٹر کے دائرے میں گاہکوں کو خدمات فراہم کرے گی۔",
      subtitleEnglish: "Every Barqat shop will serve customers within a one-kilometer radius."
    }
  },
  {
    id: "fleetless_intro",
    startTime: 87,
    duration: 4,
    camera: {
      position: [0, 6, 6],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "moveRider",
      payload: { step: "appear" }
    },
    voiceover: {
      file: "beat_15a_fleetless_intro.mp3",
      subtitleUrdu: "ڈیلیوری کے لیے برقت اپنی کوئی گاڑی نہیں رکھے گا۔",
      subtitleEnglish: "For delivery, Barqat will not own any vehicles."
    }
  },
  {
    id: "fleetless_rider_register",
    startTime: 91,
    duration: 5,
    camera: {
      position: [0, 5, 5],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "moveRider",
      payload: { step: "register" }
    },
    voiceover: {
      file: "beat_15b_fleetless_rider_register.mp3",
      subtitleUrdu: "اس کے بجائے، آزاد رائیڈرز — جو اپنی گاڑی خود رکھتے ہیں — برقت کے ساتھ رجسٹرڈ ہوں گے۔",
      subtitleEnglish: "Instead, independent riders — who own their own vehicles — will be registered with Barqat."
    }
  },
  {
    id: "fleetless_lock_and_fill",
    startTime: 96,
    duration: 5,
    camera: {
      position: [0, 4, 4],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "moveRider",
      payload: { step: "lockAndFill" }
    },
    voiceover: {
      file: "beat_15c_fleetless_lock_and_fill.mp3",
      subtitleUrdu: "جب انہیں آرڈر ملتا ہے، وہ اسے لاک کرتے ہیں، دکان جا کر ٹوکری بھرتے ہیں۔",
      subtitleEnglish: "When they get an order, they lock it, go to the shop, fill the basket."
    }
  },
  {
    id: "fleetless_deliver",
    startTime: 101,
    duration: 4,
    camera: {
      position: [0, 6, 6],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "moveRider",
      payload: { step: "deliver" }
    },
    voiceover: {
      file: "beat_15d_fleetless_deliver.mp3",
      subtitleUrdu: "اور گاہک کے عین مقام تک پہنچاتے ہیں۔",
      subtitleEnglish: "And deliver to the customer's exact location."
    }
  },
  {
    id: "lean_strategy",
    startTime: 105,
    duration: 5,
    camera: {
      position: [0, 8, 8],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "dimMap"
    },
    overlay: {
      component: "TitleCard",
      props: {
        title: "Lean Execution",
        subtitle: "Reduced Cost, Well-Served Customers"
      }
    },
    voiceover: {
      file: "beat_16_lean_strategy.mp3",
      subtitleUrdu: "اس لین ایگزیکیوشن حکمتِ عملی کے ذریعے، لاگت کم رہتی ہے اور گاہک بھرپور طریقے سے مطمئن رہتے ہیں۔",
      subtitleEnglish: "Through this lean execution strategy, costs remain low and customers are well satisfied."
    }
  },
  {
    id: "tech_ops_team",
    startTime: 110,
    duration: 9,
    camera: {
      position: [0, 7, 7],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "moveRider",
      payload: { step: "opsMerge" }
    },
    voiceover: {
      file: "beat_17_tech_ops_team.mp3",
      subtitleUrdu: "ہماری مخصوص ٹیکنالوجی ٹیم گاہک کے رویے کی مسلسل نگرانی کرے گی۔ ٹیکنالوجی اور آپریشنز کی ٹیمیں مل کر کام کریں گی، اور ہر مسئلہ فوری طور پر، بغیر کسی اضافی بوجھ کے حل کیا جائے گا۔",
      subtitleEnglish: "Our dedicated technology team will continuously monitor customer behavior. Technology and operations teams will work together, and every problem will be resolved immediately, without extra overhead."
    }
  },
  {
    id: "validation",
    startTime: 119,
    duration: 7,
    camera: {
      position: [0, 7, 7],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "restoreMap"
    },
    overlay: {
      component: "Checklist",
      props: {
        items: [
          { label: "B2B routing established", checked: true },
          { label: "B2C fleetless model active", checked: true },
          { label: "Tech + Ops model validated", checked: true }
        ]
      }
    },
    voiceover: {
      file: "beat_18_validation.mp3",
      subtitleUrdu: "اس طرح، بی ٹو بی ٹو سی ماڈل میں ہر مسئلہ بخوبی حل کیا جاتا ہے، اور توسیع سے پہلے آئیڈیا کی مکمل تصدیق ہو جاتی ہے۔",
      subtitleEnglish: "This way, every problem in the B2B2C model is well resolved, and the idea is fully validated before expansion."
    }
  },
  {
    id: "expansion_criteria",
    startTime: 126,
    duration: 26,
    camera: {
      position: [0, 7, 7],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "restoreMap"
    },
    overlay: {
      component: "Checklist",
      props: {
        title: "Criteria for Expansion",
        items: [
          { label: "Idea validation (proven inventoryless & fleetless)", checked: true },
          { label: "Mature techstack e2e (unified tech & ops)", checked: true }
        ]
      }
    },
    voiceover: {
      file: "beat_18b_expansion_criteria.mp3",
      subtitleUrdu: "توسیع کے لیے ہمارے پاس دو اہم معیارات ہیں۔ پہلا معیار: آئیڈیا کی تصدیق۔ جب برقت کا انوینٹری لیس اور فلیٹ لیس ماڈل ایک دکان پر کامیابی سے ثابت ہو جائے گا، صرف تب ہی ہم دوسری دکانوں کی طرف بڑھیں گے، تاکہ کسی بھی مسئلے کو ایک ہی جگہ فوری حل کیا جا سکے۔ دوسرا معیار: پختہ اینڈ ٹو اینڈ ٹیکنالوجی اور آپریشنز ٹیم۔ چونکہ ہماری ٹیکنالوجی اور آپریشنز ٹیمیں متحد ہیں، اس لیے ہر آپریشنل مسئلہ بغیر کسی تاخیر اور درمیانی واسطوں کے فوری حل ہو جاتا ہے۔ جب یہ دونوں معیارات پورے ہوتے ہیں، تب ہم توسیع کا آغاز کرتے ہیں۔",
      subtitleEnglish: "We have two key criteria for expansion. First: Idea Validation. We only scale once Barqat's inventoryless and fleetless model is proven at a single shop, ensuring any issues are iterated on quickly. Second: Mature End-to-End Tech Stack. Our unified technology and operations teams work hand-in-hand to resolve issues at runtime without overhead. Once both pass, we expand."
    }
  },
  {
    id: "expansion_zoom",
    startTime: 152,
    duration: 13,
    camera: {
      position: [0, 16, 16],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "expansionZoom",
      payload: { active: true }
    },
    voiceover: {
      file: "beat_19_expansion_zoom.mp3",
      subtitleUrdu: "اب دیکھیں — ایک دکان اور اس کا دائرہ مکمل طور پر خدمات فراہم کر رہا ہے۔ اب ہم آہستہ آہستہ باہر کی طرف بڑھتے ہیں، اور مشترکہ روٹس پر مزید دکانیں منتخب کرتے ہیں — ہر ایک کے ساتھ اپنا ایک کلومیٹر دائرہ۔",
      subtitleEnglish: "Now watch — one shop and its radius is fully serving. Now we gradually expand outward, selecting more shops on common routes — each with its own one-kilometer radius."
    }
  },
  {
    id: "expansion_checklist",
    startTime: 165,
    duration: 4,
    camera: {
      position: [0, 16, 16],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "expansionZoom",
      payload: { active: true, showFullChecklist: true }
    },
    overlay: {
      component: "Checklist",
      props: {
        title: "Expansion Milestones",
        items: [
          { label: "12 distributor routes merged", checked: true },
          { label: "Fleetless network scaled", checked: true },
          { label: "Entire coverage live", checked: true }
        ]
      }
    },
    voiceover: {
      file: "beat_20_expansion_checklist.mp3",
      subtitleUrdu: "اور اب، پورا علاقہ مکمل طور پر خدمات کے دائرے میں آ چکا ہے۔",
      subtitleEnglish: "And now, the entire area has fully come under the coverage."
    }
  },
  {
    id: "thank_you",
    startTime: 169,
    duration: 5,
    camera: {
      position: [0, 8, 8],
      lookAt: [0, 0, 0]
    },
    visualAction: {
      type: "showLogo"
    },
    overlay: {
      component: "TitleCard",
      props: {
        title: "BARQAT",
        subtitle: "Consolidated B2B2C Plan — Thank You"
      }
    },
    voiceover: {
      file: "beat_21_thank_you.mp3",
      subtitleUrdu: "یہ ہے برقت کا مکمل بی ٹو بی ٹو سی عملی منصوبہ۔ آپ کی توجہ کا شکریہ۔",
      subtitleEnglish: "This is Barqat's complete B2B2C execution plan. Thank you for your attention."
    }
  }
];
