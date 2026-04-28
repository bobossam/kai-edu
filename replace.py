import os

files = ["index.html", "manage.html", "chat.html"]

replacements = [
    ("피닉스 치과", "한국AI교육연구원"),
    ("Phoenix Dental", "한국AI교육연구원"),
    ("Phoenix AI", "한국AI교육연구원"),
    ("피닉스", "한국AI교육연구원"),
    ("070-8064-6114", "010-8081-9678"),
    ("phoenixai.sw@gmail.com", "bobossam9678@gmail.com"),
    ("phoenix-portal.site", "kaiedu.kr"),
    ("phoenixdental.kr", "kaiedu.kr"),
    ("./Logos/phoenix_ai_logo.jpg", "./Logos/Minimal_modern_logo_design_for_Korea_AI_Education_-1777384248051.png"),
    ("./images/high_01_cover.png", "./images/Professional_sketch-style_illustration_for_Korean_-1777375692992.png"),
    ("./images/high_02_chatbot.png", "./images/Premium_sketch-style_illustration_for_AI_EDUCATIO-1777375703166.png"),
    ("./images/high_03_before_after.png", "./images/Elegant_sketch-style_before-and-after_comparison_i-1777375711734.png"),
    ("./images/medium_01_dashboard.png", "./images/Professional_sketch_infographic_KOREAN_AI_EDUCATI-1777375717153.png"),
    ("./images/medium_02_omnichannel.png", "./images/Elegant_sketch-style_infographic_showing_OPENCLAW-1777375697074.png"),
    ("./images/medium_03_crm_report.png", "./images/Comprehensive_sketch_illustration_AI_SOLUTION_ECO-1777375726337.png"),
    ("./images/low_01_hero.png", "./images/Sophisticated_sketch_illustration_of_CUSTOMIZED_L-1777375700323.png"),
    ("./images/low_02_flow.png", "./images/Clean_sketch_infographic_showing_TARGET_CUSTOMERS-1777375705805.png"),
    ("./images/low_03_cta.png", "./images/Sophisticated_sketch-style_contact_information_car-1777375959463.png"),
    ("20260428_피닉스치과_고객관리.html", "manage.html"),
    ("20260428_피닉스치과_챗봇관리.html", "chat.html")
]

for fname in files:
    if os.path.exists(fname):
        with open(fname, "r", encoding="utf-8") as f:
            content = f.read()
        for old, new in replacements:
            content = content.replace(old, new)
        with open(fname, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {fname}")
