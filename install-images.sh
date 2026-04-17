#!/bin/bash

# ==========================================================
# Portfolio Image Installer
# Copies AI-generated thumbnails to the public/images folder
# ==========================================================

# Base destination
DEST="./public/images"
mkdir -p "$DEST"

# List of files we want to copy from the brain directory
# Replace BRAIN_DIR with the actual brain directory if running manually
BRAIN_DIR="/Users/wulsmac/.gemini/antigravity/brain/a9789410-9bc3-4bf7-acf5-7274f8ab536f"

echo "Installing portfolio and blog illustrations..."

# Map generated brain files to public filenames
cp "$BRAIN_DIR/thumb_simrs_kesehatan_new_1774944645868.png" "$DEST/thumb-simrs-kesehatan.png" 2>/dev/null
cp "$BRAIN_DIR/thumb_cx_platform_1774944018077.png" "$DEST/thumb-cx-platform.png" 2>/dev/null
cp "$BRAIN_DIR/thumb_lkpp_procurement_1774944034238.png" "$DEST/thumb-lkpp-procurement.png" 2>/dev/null
cp "$BRAIN_DIR/thumb_fintech_onboarding_1774944085306.png" "$DEST/thumb-fintech-onboarding.png" 2>/dev/null
cp "$BRAIN_DIR/thumb_design_system_1774944099761.png" "$DEST/thumb-design-system.png" 2>/dev/null
cp "$BRAIN_DIR/thumb_ina_digital_1774944115115.png" "$DEST/thumb-ina-digital.png" 2>/dev/null

cp "$BRAIN_DIR/blog_cognitive_fintech_1774944184151.png" "$DEST/blog-cognitive-fintech.png" 2>/dev/null
cp "$BRAIN_DIR/blog_government_ux_1774944203027.png" "$DEST/blog-government-ux.png" 2>/dev/null
cp "$BRAIN_DIR/blog_design_system_1774944218427.png" "$DEST/blog-design-system.png" 2>/dev/null
cp "$BRAIN_DIR/blog_service_design_1774944303735.png" "$DEST/blog-service-design.png" 2>/dev/null
cp "$BRAIN_DIR/blog_ai_product_1774944317676.png" "$DEST/blog-ai-product.png" 2>/dev/null

echo "✅ Portfolio illustrations updated in $DEST"
