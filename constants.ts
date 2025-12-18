import { SlideData, SurveyQuestion } from './types';

export const APP_TITLE = "Welcome to your personal hair wellness journey.";

export const ONBOARDING_SLIDES: SlideData[] = [
  {
    id: 1,
    title: APP_TITLE,
    description: "Answer questions about your hair and upload photos for analysis.",
    imageAlt: "User taking a photo of their hair",
    imageSrc: "/image_4.png"
  },
  {
    id: 2,
    title: APP_TITLE,
    description: "Get an in-depth hair report and personalized recommendations.",
    imageAlt: "Hair report dashboard example",
    imageSrc: "/image_1.png"
  },
  {
    id: 3,
    title: APP_TITLE,
    description: "Follow easy, effective routines tailored to your unique hair needs.",
    imageAlt: "Daily routine checklist",
    imageSrc: "/image_3.png"
  },
  {
    id: 4,
    title: APP_TITLE,
    description: "Track your progress and adjust your routine as your hair improves.",
    imageAlt: "Progress tracker graph",
    imageSrc: "/image_2.png"
  }
];

export const SURVEY_STEPS: SurveyQuestion[] = [
  {
    id: 'name',
    type: 'text',
    title: "Welcome to Mesu.\nWhat should we call you?",
    placeholder: "Enter your name",
    disclaimer: "Any information you share is private and used only to personalize your experience."
  },
  {
    id: 'goals',
    type: 'multi-select',
    title: "{name}, what brings you here today?",
    options: [
      { id: 'better_care', label: "I want to take better care of my hair" },
      { id: 'understand_changes', label: "I've noticed some changes and want to understand them" },
      { id: 'life_changes', label: "I'm going through life changes and my hair's affected" },
      { id: 'thinning_texture', label: "I'm ready to address thinning or texture issues" },
      { id: 'prevent_future', label: "I want to prevent future problems" },
      { id: 'professional_guidance', label: "I want professional guidance, not random products" }
    ],
    disclaimer: "Select all options that apply to you."
  },
  {
    id: 'birth_year',
    type: 'year-picker',
    title: "What year were you born?",
    disclaimer: "This helps us tailor your hair analysis and product recommendations."
  },
  {
    id: 'gender',
    type: 'single-select',
    title: "Let's get to know you a little better.\nHow do you identify?",
    options: [
      { id: 'woman', label: "Woman" },
      { id: 'man', label: "Man" },
      { id: 'non_binary', label: "Non-binary" },
      { id: 'prefer_not_say', label: "Prefer not to say" }
    ],
    disclaimer: "Hair care needs vary by biological factors—this helps us personalize better."
  },
  {
    id: 'health_changes',
    type: 'single-select',
    title: "Let's get to know you a little better.\nAre you experiencing any health changes?",
    options: [
      { id: 'none', label: "No significant changes" },
      { id: 'age_related', label: "Age-related changes (hair pattern changes)" },
      { id: 'stress', label: "Stress-related changes" },
      { id: 'weight_lifestyle', label: "Recent weight or lifestyle changes" },
      { id: 'medication', label: "Taking medications (that may affect hair)" },
      { id: 'prefer_not_say', label: "Prefer not to say" }
    ],
    disclaimer: "Hormonal and life changes significantly affect hair health."
  },
  {
    id: 'results_preview',
    type: 'testimonials',
    title: "{name}, here's what people like you have achieved with Mesu's personalized routines.",
    subtitle: "Mesu removes the guesswork, helping you find the right products and routines for your hair.",
    testimonials: [
      {
        id: 1,
        name: "Lila",
        age: 27,
        timeframe: "3 months with Mesu",
        result: "My frizz is finally under control. I never thought my natural hair could look this polished and healthy.",
        beforeImage: "/testimonial_1.jpg",
        afterImage: "/testimonial_1.jpg"
      },
      {
        id: 2,
        name: "Maya",
        age: 31,
        timeframe: "4 months with Mesu",
        result: "The strength and shine are incredible. My hair feels thicker and much more resilient than before.",
        beforeImage: "/testimonial_2.jpg",
        afterImage: "/testimonial_2.jpg"
      },
      {
        id: 3,
        name: "Clara",
        age: 35,
        timeframe: "5 months with Mesu",
        result: "I finally found a routine that actually works for my texture. The transformation has been a huge confidence boost.",
        beforeImage: "/testimonial_3.jpg",
        afterImage: "/testimonial_3.jpg"
      },
      {
        id: 4,
        name: "Elena",
        age: 44,
        timeframe: "6 months with Mesu",
        result: "My hair hasn't looked this full and vibrant in years. The personalized approach made all the difference.",
        beforeImage: "/testimonial_4.jpg",
        afterImage: "/testimonial_4.jpg"
      }
    ]
  },
  {
    id: 'profile_start_transition',
    type: 'transition',
    title: "Let's start building your hair profile, {name}.",
    subtitle: "Answer a few questions about you so we can better understand your hair's characteristics and needs.",
    imageSrc: "/illustration_touch.png"
  },
  {
    id: 'current_hair_status',
    type: 'single-select',
    title: "Next, let's start building your hair profile.\nHow would you describe your hair right now?",
    options: [
      { id: 'happy', label: "Happy with my hair, just want to optimize" },
      { id: 'okay', label: "It's okay, but it could be better" },
      { id: 'noticed_changes', label: "I've noticed some changes recently" },
      { id: 'concerned', label: "I'm concerned about my hair's current state" },
      { id: 'ready_improvements', label: "I'm ready for significant improvements" }
    ],
    disclaimer: "Any information you share is private and used only to personalize your experience."
  },
  {
    id: 'improvements',
    type: 'multi-select',
    title: "What would you like to improve?",
    options: [
      { id: 'vitality', label: "Overall vitality and strength" },
      { id: 'thickness', label: "Thickness and volume" },
      { id: 'shine', label: "Shine and smoothness" },
      { id: 'scalp_health', label: "Scalp health and comfort" },
      { id: 'growth_rate', label: "Growth rate" },
      { id: 'texture', label: "Texture and curl pattern" },
      { id: 'dryness_oiliness', label: "Dryness or oiliness" },
      { id: 'breakage', label: "Breakage or split ends" },
      { id: 'frizz', label: "Frizz control" },
      { id: 'maintain', label: "None - just maintain health" }
    ],
    disclaimer: "Select all options that apply to you."
  },
  {
    id: 'changes_timeline',
    type: 'single-select',
    title: "If you've noticed changes, when did they start?",
    options: [
      { id: 'recently', label: "Recently (past few months)" },
      { id: '6_12_months', label: "6-12 months ago" },
      { id: '1_2_years', label: "1-2 years ago" },
      { id: 'more_than_2_years', label: "More than 2 years ago" },
      { id: 'no_changes', label: "No significant changes" },
      { id: 'not_sure', label: "Not sure" }
    ],
    disclaimer: "The timeline of changes helps us understand the underlying causes."
  },
  {
    id: 'hair_texture',
    type: 'single-select',
    title: "What's your natural hair texture?",
    options: [
      { id: 'straight', label: "Straight" },
      { id: 'wavy', label: "Wavy" },
      { id: 'curly', label: "Curly" },
      { id: 'coily', label: "Coily / Kinky" },
      { id: 'mixed', label: "Mixed textures" },
      { id: 'not_sure', label: "Not sure" }
    ],
    disclaimer: "Different textures need different care approaches."
  },
  {
    id: 'hair_thickness',
    type: 'single-select',
    title: "How would you describe your hair thickness?",
    options: [
      { id: 'fine', label: "Fine" },
      { id: 'medium', label: "Medium" },
      { id: 'thick', label: "Thick" },
      { id: 'varies', label: "Varies along the strand" },
      { id: 'not_sure', label: "Not sure" }
    ],
    disclaimer: "Strand thickness affects product absorption and styling needs."
  },
  {
    id: 'hair_density',
    type: 'single-select',
    title: "How would you describe your hair density?",
    options: [
      { id: 'thin', label: "Thin (can see scalp easily)" },
      { id: 'medium', label: "Medium (some scalp visibility)" },
      { id: 'thick', label: "Thick (little to no scalp visibility)" },
      { id: 'not_sure', label: "Not sure (we'll assess with photos later)" }
    ],
    disclaimer: "Density helps us assess overall hair health and progress potential."
  },
  {
    id: 'not_alone_info',
    type: 'info-carousel',
    title: "{name}, you're not alone.",
    subtitle: "Hair changes are incredibly common, affecting people across all ages and backgrounds.",
    imageSrc: "/illustration_support.png",
    infoSlides: [
      {
        id: 1,
        icon: "💆🏼‍♀️",
        text: "Over 50% of adults experience noticeable hair changes at some point in their lives."
      },
      {
        id: 2,
        icon: "🧬",
        text: "Genetics play a role, but lifestyle and care habits often matter more than you think."
      },
      {
        id: 3,
        icon: "🌱",
        text: "With the right approach, hair at any age can improve in strength and vitality."
      },
      {
        id: 4,
        icon: "💪🏼",
        text: "Consistent, personalized care creates visible results within 3-4 months for most people."
      }
    ]
  },
  {
    id: 'almost_there_transition',
    type: 'transition',
    title: "We're almost there, {name}!",
    subtitle: "Answer these final questions to help us create the most effective routine for your hair.",
    imageSrc: "/illustration_mirror.png"
  },
  {
    id: 'family_history',
    type: 'single-select',
    preTitle: "A few more questions to fine-tune your hair analysis.",
    title: "Do you have a family history of hair concerns?",
    options: [
      { id: 'mother', label: "Yes, mother's side" },
      { id: 'father', label: "Yes, father's side" },
      { id: 'both', label: "Yes, both sides" },
      { id: 'none', label: "No family history" },
      { id: 'not_sure', label: "Not sure" }
    ],
    disclaimer: "Genetics play a role, but lifestyle factors matter more than you think."
  },
  {
    id: 'scalp_feel',
    type: 'single-select',
    title: "How does your scalp feel most of the time?",
    options: [
      { id: 'oily', label: "Oily (gets greasy quickly)" },
      { id: 'dry', label: "Dry (flaky or tight feeling)" },
      { id: 'balanced', label: "Balanced (just right)" },
      { id: 'sensitive', label: "Sensitive (itchy or irritated)" },
      { id: 'flaky', label: "Flaky (visible flakes)" },
      { id: 'varies', label: "Varies by area" }
    ],
    disclaimer: "Scalp health is the foundation of healthy hair growth."
  },
  {
    id: 'hair_length',
    type: 'single-select',
    title: "What's your current hair length?",
    options: [
      { id: 'very_short', label: "Very short (above ears)" },
      { id: 'short', label: "Short (chin level)" },
      { id: 'medium', label: "Medium (shoulder level)" },
      { id: 'long', label: "Long (past shoulders)" },
      { id: 'very_long', label: "Very long (mid-back or longer)" }
    ],
    disclaimer: "Hair length influences care needs and product recommendations."
  },
  {
    id: 'wash_frequency',
    type: 'single-select',
    title: "How often do you wash your hair?",
    options: [
      { id: 'daily', label: "Once a day" },
      { id: 'multiple_daily', label: "Multiple times a day" },
      { id: 'few_times_week', label: "2-3 times per week" },
      { id: 'weekly', label: "Once a week" },
      { id: 'less_weekly', label: "Less than once a week" },
      { id: 'varies', label: "It varies" }
    ],
    disclaimer: "Wash frequency affects scalp health and product effectiveness."
  },
  {
    id: 'current_routine',
    type: 'multi-select',
    title: "What's your current hair care routine?",
    options: [
      { id: 'shampoo', label: "Shampoo" },
      { id: 'conditioner', label: "Conditioner" },
      { id: 'mask', label: "Hair mask/deep conditioner" },
      { id: 'leave_in', label: "Leave-in treatments" },
      { id: 'oils', label: "Oils or serums" },
      { id: 'scalp_treatment', label: "Scalp treatments" },
      { id: 'heat_protectant', label: "Heat protectant" },
      { id: 'styling', label: "Styling products" },
      { id: 'supplements', label: "Supplements" },
      { id: 'minimal', label: "Minimal routine" }
    ],
    disclaimer: "Select all options that apply to you."
  },
  {
    id: 'styling_habits',
    type: 'multi-select',
    title: "How do you typically style your hair?",
    options: [
      { id: 'heat', label: "Heat styling (straightener/curler)" },
      { id: 'blow_dry', label: "Blow drying" },
      { id: 'air_dry', label: "Air drying" },
      { id: 'braiding', label: "Braiding/protective styles" },
      { id: 'tight_styles', label: "Tight ponytails/buns" },
      { id: 'chemical', label: "Chemical treatments (color, perm, relaxer)" },
      { id: 'minimal', label: "Minimal styling" }
    ],
    disclaimer: "Select all options that apply to you."
  },
  {
    id: 'journey_roadmap',
    type: 'checklist-carousel',
    title: "{name}, here's what to expect on your journey.",
    subtitle: "Your timeline is unique, but here's what most people experience with personalized care.",
    journeyPhases: [
      {
        id: 1,
        phaseLabel: "Phase 1",
        title: "Foundation",
        duration: "Weeks 1-4",
        items: [
          "Healthier scalp environment",
          "Reduced daily shedding",
          "Better product routine established"
        ],
        imageSrc: "/journey_1.jpg"
      },
      {
        id: 2,
        phaseLabel: "Phase 2",
        title: "Active Improvement",
        duration: "Weeks 4-12",
        items: [
          "Visible strengthening",
          "Improved texture and feel",
          "Building healthy habits"
        ],
        imageSrc: "/journey_2.jpg"
      },
      {
        id: 3,
        phaseLabel: "Phase 3",
        title: "Visible Results",
        duration: "Months 3-4",
        items: [
          "Noticeable improvements",
          "Increased confidence",
          "Sustained progress"
        ],
        imageSrc: "/journey_3.jpg"
      },
      {
        id: 4,
        phaseLabel: "Phase 4",
        title: "Optimization",
        duration: "Month 4+",
        items: [
          "Maintaining results",
          "Adapting to your needs",
          "Long-term wellness"
        ],
        imageSrc: "/journey_4.jpg"
      }
    ]
  },
  {
    id: 'social_proof',
    type: 'testimonials',
    title: "See real results from people like you.",
    subtitle: "Hear from women who have transformed their hair with personalized care.",
    testimonials: [
      {
        id: 1,
        name: "Jessica",
        age: 38,
        timeframe: "4 months with Mesu",
        result: "After just a few months, my hair feels stronger and looks shinier than it has in years. The personalized routine made all the difference.",
        beforeImage: "/photo_testimonial_1.jpg",
        afterImage: "/photo_testimonial_2.jpg"
      }
    ]
  },
  {
    id: 'scan_intro',
    type: 'info-carousel',
    title: "Next, let's take pictures of your hair.",
    subtitle: "We'll analyze the photos alongside your hair questionnaire to spot potential issues and create your personalized hair care plan.",
    imageSrc: "/image_1.png",
    customButtonText: "Scan Your Hair",
    infoSlides: [
      { id: 1, text: "Answer questions about your hair and upload photos for analysis.", imageSrc: "/onboarding_1.png" },
      { id: 2, text: "Get an in-depth hair report and personalized recommendations.", imageSrc: "/onboarding_2.png" },
      { id: 3, text: "Follow easy, effective routines tailored to your unique hair needs.", imageSrc: "/onboarding_3.png" },
      { id: 4, text: "Track your progress and adjust your routine as your hair improves.", imageSrc: "/onboarding_4.png" }
    ]
  },
  {
    id: 'email',
    type: 'text',
    title: "One last thing, {name}.\nWhere should we send your results?",
    placeholder: "Enter your email address",
    disclaimer: "We'll send your full 12-week plan and analysis to this address.",
    customButtonText: "Prepare My Analysis"
  },
  {
    id: 'photo_upload',
    type: 'photo-capture',
    title: "Capture your hair profile.",
    subtitle: "Please take or upload clear photos of your hair from the front and side for the best analysis.",
    photoViews: [
      { id: 'front', label: "Front View", description: "Face camera directly", required: true },
      { id: 'side', label: "Side View", description: "Turn 90 degrees", required: true }
    ],
    disclaimer: "Photos are encrypted and processed securely."
  }
];