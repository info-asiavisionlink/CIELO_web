// ============================================
// CIELO Website — Image Configuration
// 画像構成: 25枚 + Brand Assets
//
// 画像URLが準備できたら url: "" に Cloudinary URL を入力してください。
// URLが空の場合、プレースホルダーが表示されます。
//
// 構成:
//   IMAGE_001〜005  : Art（5カテゴリ）
//   IMAGE_006〜011  : Apparel（Product × 3 + Wearing × 3）
//   IMAGE_012〜021  : Jewelry（Product × 5 + Wearing × 5）
//   IMAGE_022〜024  : Brand Section（Hero / About / Philosophy）
//   IMAGE_025       : OGP Image
// ============================================

var CIELO_IMAGES = {

  // ── Brand Assets（設定済み） ──
  LOGO_CIELO: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781495771/e6azpivui9xg68hr1ria.png",
    alt: "CIELO Logo"
  },
  WORDMARK_CIELO: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781495769/fzzxktjm2c5feemspvqu.png",
    alt: "CIELO Wordmark"
  },

  // ── Art ──
  IMAGE_001: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781587594/u7696224659_CIELO_original_pop_culture_artwork_contemporary_s_485147e0-3416-48d7-9605-7cd7b9600a9c_0_uvjupp.png",
    alt: "CIELO Art — Pop Culture Inspired Art"
  },
  IMAGE_002: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781588150/u7696224659_CIELO_original_street_culture_inspired_artwork_lu_99f0d3a6-4d60-4cce-9b75-360e135fa1ab_3_ptkc6y.png",
    alt: "CIELO Art — Street Culture Art"
  },
  IMAGE_003: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781588496/u7696224659_CIELO_original_hip_hop_culture_artwork_inspired_b_a73d4587-55bf-4e6a-8175-179d7a6e0e62_3_lnlh5q.png",
    alt: "CIELO Art — Hip Hop Inspired Art"
  },
  IMAGE_004: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781588743/u7696224659_CIELO_luxury_light_art_masterpiece_sapphire_blue__b864f551-26d1-46d0-af25-4e05d4ec802b_0_yviapq.png",
    alt: "CIELO Art — Neon Inspired Art"
  },
  IMAGE_005: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781589043/u7696224659_CIELO_signature_character_artwork_mysterious_luxu_3424a0ae-6b1c-4635-a0b3-dbef1a14a4bf_2_iwkp73.png",
    alt: "CIELO Art — Original Character Art"
  },

  // ── Apparel ──
  IMAGE_006: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781589399/u7696224659_CIELO_luxury_streetwear_t-shirt_premium_heavyweig_b3f91faf-514a-4181-bd83-5c835c8de876_2_kbpr3b.png",
    alt: "CIELO T-Shirt — Product"
  },
  IMAGE_007: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781589694/u7696224659_street_luxury_lifestyle_portrait_artist_wearing_p_156ec8df-546f-4aea-9540-66a11823cf0d_3_bgx80c.png",
    alt: "CIELO T-Shirt — Wearing"
  },
  IMAGE_008: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781589888/u7696224659_luxury_black_long_sleeve_shirt_sapphire_blue_sign_c86800e5-3397-4f3d-8600-18f4181b2d57_2_s008hk.png",
    alt: "CIELO Long Sleeve — Product"
  },
  IMAGE_009: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781590182/u7696224659_premium_long_sleeve_streetwear_styling_sapphire_b_519ccf77-aad0-47a9-a623-3acd63ce8959_1_zib0k4.png",
    alt: "CIELO Long Sleeve — Wearing"
  },
  IMAGE_010: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781590407/u7696224659_CIELO_signature_moissanite_apparel_product_luxury_d97995a7-60a4-469e-b552-3668438dc732_3_hjfcww.png",
    alt: "CIELO Moissanite Apparel — Product"
  },
  IMAGE_011: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781590680/u7696224659_luxury_streetwear_editorial_portrait_person_weari_88e9061e-de4c-4d99-954f-41942db16018_1_yurjeo.png",
    alt: "CIELO Moissanite Apparel — Wearing"
  },

  // ── Jewelry ──
  IMAGE_012: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781590897/u7696224659_luxury_moissanite_necklace_product_photography_si_08f5a4cb-2e59-417b-a7c7-e845bcce2bac_0_b8tcdd.png",
    alt: "CIELO Necklace — Product"
  },
  IMAGE_013: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781591120/u7696224659_single_statement_moissanite_pendant_worn_on_the_n_f1da2b36-daa1-4f1d-a81d-47914b4a3307_3_u6bmtv.png",
    alt: "CIELO Necklace — Wearing"
  },
  IMAGE_014: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781598057/u7696224659_premium_moissanite_statement_ring_intense_rainbow_b4ef9082-ad35-4c9a-acc3-1d9795e8cb5f_0_bc6zai.png",
    alt: "CIELO Ring — Product"
  },
  IMAGE_015: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781598290/u7696224659_luxury_lifestyle_close-up_hand_resting_on_premium_f8eca8b3-69d6-492c-8271-10c65f26e59a_3_pjesld.png",
    alt: "CIELO Ring — Wearing"
  },
  IMAGE_016: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781598507/u7696224659_CIELO_signature_moissanite_bracelet_product_photo_bd30e581-528c-4427-aca8-7f147bdfa80c_2_tx3kcd.png",
    alt: "CIELO Bracelet — Product"
  },
  IMAGE_017: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781598689/u7696224659_premium_wrist_styling_luxury_moissanite_bracelet__665ccd36-994f-4eff-8b29-608fa4d56d62_2_uryr7e.png",
    alt: "CIELO Bracelet — Wearing"
  },
  IMAGE_018: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781598873/u7696224659_CIELO_signature_moissanite_earrings_product_photo_f486d2bd-c341-45d6-9eb6-237b3487a166_1_mlsnsb.png",
    alt: "CIELO Earrings — Product"
  },
  IMAGE_019: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781599048/u7696224659_luxury_street_elegance_portrait_moissanite_earrin_b8e8a24b-8cc2-4d6a-88bf-eae348ea5151_3_p5fcpf.png",
    alt: "CIELO Earrings — Wearing"
  },
  IMAGE_020: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781599248/u7696224659_CIELO_signature_moissanite_collection_luxury_jewe_b6225f36-b526-4bde-a451-267720362b44_2_hpcnu4.png",
    alt: "CIELO Moissanite Jewelry — Product"
  },
  IMAGE_021: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781599403/u7696224659_luxury_entrepreneur_lifestyle_portrait_complete_m_335df2a6-aea1-4d61-915c-c74ebb0fd29f_0_bv1uzo.png",
    alt: "CIELO Moissanite Jewelry — Wearing"
  },

  // ── Hero Slider ──
  HERO_001: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781601145/u7696224659_luxury_street_culture_campaign_image_confident_fi_dcc726dd-2037-4618-a928-19668510b940_1_loinoe.png",
    alt: "CIELO — 人物 × T-Shirt × Necklace × Original Character Art"
  },
  HERO_002: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781601291/u7696224659_luxury_street_culture_campaign_image_person_weari_d25b4b11-329c-4e6c-9e42-fecf7bc7efc1_2_dwhuor.png",
    alt: "CIELO — 人物 × Black Apparel × Jewelry × Neon Art"
  },
  HERO_003: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781601495/u7696224659_luxury_street_culture_campaign_image_person_weari_01b29187-2494-4549-9b9c-8084daf4eb95_2_tkdltf.png",
    alt: "CIELO — 人物 × White Apparel × Jewelry × Pop Culture Art"
  },
  HERO_004: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781601612/u7696224659_luxury_street_culture_campaign_finale_two_or_thre_a03f5736-c745-4865-b60a-78a80b85f5e0_0_a9jzrn.png",
    alt: "CIELO — 人物 × Street Luxury × Jewelry × Street Culture Art"
  },

  // ── Brand Sections ──
  IMAGE_023: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781599798/u7696224659_CIELO_brand_story_portrait_luxury_entrepreneur_an_d6e68f78-b3a4-4430-a4cf-aeed9111f5d1_0_ntwaji.png",
    alt: "CIELO About — Brand Story"
  },
  IMAGE_024: {
    url: "https://res.cloudinary.com/deyc8gz2k/image/upload/v1781599985/u7696224659_luxury_philosophy_campaign_image_dark_architectur_50d3aaa9-d6b9-4529-899c-2335ff807336_3_ytcj9y.png",
    alt: "CIELO Brand Philosophy"
  },

  // ── OGP（未設定 — Figma等で別途作成・/ogp.jpg として配置） ──
  IMAGE_025: {
    url: "",
    alt: "CIELO — Street Luxury Brand OGP"
  }

};
