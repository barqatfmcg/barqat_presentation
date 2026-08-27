import os
import sys
from gtts import gTTS

# Array mapping exact files in src/data/script.ts to the Urdu transcription text
BEATS = [
    {
        "file": "beat_01_intro.mp3",
        "text": "معزز حضرات، خوش آمدید۔ آئیے مل کر برقت کے مکمل عملی منصوبے کا جائزہ لیتے ہیں — بی ٹو بی سے بی ٹو سی تک۔"
    },
    {
        "file": "beat_02_shop_appear.mp3",
        "text": "سب سے پہلے، ہمیں ایک مرکزی دکان کا انتخاب کرنا ہے۔ یہ انتخاب دو اہم اصولوں پر مبنی ہوگا۔"
    },
    {
        "file": "beat_03_criteria_1.mp3",
        "text": "پہلا اصول: علاقے کی صلاحیت۔ ہم ایسی دکان منتخب کریں گے جس کا علاقہ مستقبل میں بی ٹو سی ڈیلیوری کے لیے موزوں ہو، اور جہاں گاہک نئی سہولیات جلد اپنانے کو تیار ہوں — یعنی ارلی ایڈاپٹرز۔"
    },
    {
        "file": "beat_04_criteria_2.mp3",
        "text": "دوسرا اصول: مشترکہ تقسیم کار روٹس۔ ہم تمام ڈسٹری بیوٹرز کے روٹس کا تفصیل سے جائزہ لیں گے، اور ایسی دکان منتخب کریں گے جو تمام روٹس کے لیے مشترکہ ہو — تاکہ سامان کسی اضافی لاگت کے بغیر دکان تک پہنچے۔"
    },
    {
        "file": "beat_05_tech_transition.mp3",
        "text": "دکان کے انتخاب کے بعد، اگلا مرحلہ ہے ٹیکنالوجی کا انضمام۔"
    },
    {
        "file": "beat_06_tech_benefits.mp3",
        "text": "برقت بی ٹو بی ایپ پہلے سے موجود ہے، لیکن ہم ایک اور آسان حل تجویز کرتے ہیں: واٹس ایپ گیٹ وے۔ اس کے چار بڑے فوائد ہیں — پہلا، استعمال میں آسانی، کوئی پیچیدہ کیٹلاگ نہیں۔ دوسرا، اردو صوتی پیغام کی سہولت۔ تیسرا، دکاندار کو کسی تربیت کی ضرورت نہیں۔ اور چوتھا، بغیر کسی رکاوٹ کے فوری آن بورڈنگ۔"
    },
    {
        "file": "beat_07_video_1_trigger.mp3",
        "text": "آئیے، واٹس ایپ پر آرڈر دینے کا یہ عملی ڈیمو دیکھتے ہیں۔"
    },
    {
        "file": "beat_08_video_2_trigger.mp3",
        "text": "اب دیکھتے ہیں کہ مصنوعی ذہانت پر مبنی یہ واٹس ایپ گیٹ وے کیسے فوائد فراہم کرتا ہے۔"
    },
    {
        "file": "beat_09_return_main.mp3",
        "text": "بہترین۔ اب واپس اپنے مرکزی منصوبے کی طرف چلتے ہیں۔"
    },
    {
        "file": "beat_10_checklist_1.mp3",
        "text": "اس مرحلے تک، دو اہم کام مکمل ہو چکے ہیں: دکان کا قیام، اور ٹیکنالوجی کا انضمام۔"
    },
    {
        "file": "beat_11_replenish_routing.mp3",
        "text": "اب آتے ہیں عملی نفاذ کی طرف۔ مختلف تقسیم کاروں کے گوداموں سے سامان اسی منتخب شدہ دکان کی طرف روانہ کیا جاتا ہے — بارہ مختلف مقامات سے، ایک ساتھ۔"
    },
    {
        "file": "beat_12_replenished.mp3",
        "text": "اور دیکھیں — دکان مکمل طور پر بھر چکی ہے۔"
    },
    {
        "file": "beat_13_b2b_to_b2c.mp3",
        "text": "اب ہم بی ٹو بی سے بی ٹو سی کی طرف بڑھتے ہیں — فلیٹ لیس برقت پلان۔"
    },
    {
        "file": "beat_14_radius_reveal.mp3",
        "text": "ہر برقت دکان ایک کلومیٹر کے دائرے میں گاہکوں کو خدمات فراہم کرے گی۔"
    },
    {
        "file": "beat_15a_fleetless_intro.mp3",
        "text": "ڈیلیوری کے لیے برقت اپنی کوئی گاڑی نہیں رکھے گا۔"
    },
    {
        "file": "beat_15b_fleetless_rider_register.mp3",
        "text": "اس کے بجائے، آزاد رائیڈرز — جو اپنی گاڑی خود رکھتے ہیں — برقت کے ساتھ رجسٹرڈ ہوں گے۔"
    },
    {
        "file": "beat_15c_fleetless_lock_and_fill.mp3",
        "text": "جب انہیں آرڈر ملتا ہے، وہ اسے لاک کرتے ہیں، دکان جا کر ٹوکری بھرتے ہیں۔"
    },
    {
        "file": "beat_15d_fleetless_deliver.mp3",
        "text": "اور گاہک کے عین مقام تک پہنچاتے ہیں۔"
    },
    {
        "file": "beat_16_lean_strategy.mp3",
        "text": "اس لین ایگزیکیوشن حکمتِ عملی کے ذریعے، لاگت کم رہتی ہے اور گاہک بھرپور طریقے سے مطمئن رہتے ہیں۔"
    },
    {
        "file": "beat_17_tech_ops_team.mp3",
        "text": "ہماری مخصوص ٹیکنالوجی ٹیم گاہک کے رویے کی مسلسل نگرانی کرے گی۔ ٹیکنالوجی اور آپریشنز کی ٹیمیں مل کر کام کریں گی، اور ہر مسئلہ فوری طور پر، بغیر کسی اضافی بوجھ کے حل کیا جائے گا۔"
    },
    {
        "file": "beat_18_validation.mp3",
        "text": "اس طرح، بی ٹو بی ٹو سی ماڈل میں ہر مسئلہ بخوبی حل کیا جاتا ہے، اور توسیع سے پہلے آئیڈیا کی مکمل تصدیق ہو جاتی ہے۔"
    },
    {
        "file": "beat_19_expansion_zoom.mp3",
        "text": "اب دیکھیں — ایک دکان اور اس کا دائرہ مکمل طور پر خدمات فراہم کر رہا ہے۔ اب ہم آہستہ آہستہ باہر کی طرف بڑھتے ہیں، اور مشترکہ روٹس پر مزید دکانیں منتخب کرتے ہیں — ہر ایک کے ساتھ اپنا ایک کلومیٹر دائرہ۔"
    },
    {
        "file": "beat_20_expansion_checklist.mp3",
        "text": "اور اب، پورا علاقہ مکمل طور پر خدمات کے دائرے میں آ چکا ہے۔"
    },
    {
        "file": "beat_21_thank_you.mp3",
        "text": "یہ ہے برقت کا مکمل بی ٹو بی ٹو سی عملی منصوبہ۔ آپ کی توجہ کا شکریہ۔"
    }
]

def generate_voiceovers():
    # Target directory setup
    output_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "audio"))
    os.makedirs(output_dir, exist_ok=True)
        
    print(f"Starting Urdu voice generation using Google Text-to-Speech (gTTS). Target folder: {output_dir}")
    
    success_count = 0
    
    for i, beat in enumerate(BEATS):
        filename = beat["file"]
        text = beat["text"]
        
        print(f"[{i+1}/{len(BEATS)}] Generating '{filename}'...")
        
        try:
            # Generate TTS in Urdu using gTTS
            tts = gTTS(text=text, lang='ur')
            filepath = os.path.join(output_dir, filename)
            tts.save(filepath)
            success_count += 1
        except Exception as e:
            print(f"  [Failed] Error generating voiceover: {str(e)}")
            
    print(f"\nCompleted! Generated {success_count}/{len(BEATS)} Urdu voice files successfully.")

if __name__ == "__main__":
    generate_voiceovers()
