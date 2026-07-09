#!/bin/bash

# Configuration
SOURCE_FILE="generated.tsx"
SECTIONS_DIR="src/components/sections"
APP_DIR="src/app"
GLOBALS_CSS="src/app/globals.css"

# Text Styling
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Starting Octo Air Component Splitting Process ===${NC}"

# Check for existence of source file
if [ ! -f "$SOURCE_FILE" ]; then
    echo "Error: Source file '$SOURCE_FILE' not found in root directory!"
    exit 1
fi

# Ensure necessary directories exist
echo -e "Creating destination directories if they don't exist..."
mkdir -p "$SECTIONS_DIR"
mkdir -p "$APP_DIR"

# Define Helper Function for Extracting Sections
extract_section() {
    local name=$1
    local dest_path=$2
    echo -e "Processing section: ${YELLOW}${name}${NC} -> ${dest_path}"
    
    # Extract lines between custom START/END markers cleanly using awk
    awk "/\/\* START: ${name} \*\//{flag=1;next}/\/\* END: ${name} \*\//{flag=0}flag" "$SOURCE_FILE" > "$dest_path"
}

# 1. Extract Components
extract_section "HERO" "$SECTIONS_DIR/Hero.tsx"
extract_section "GLOBAL" "$SECTIONS_DIR/Global.tsx"
extract_section "FLEET" "$SECTIONS_DIR/Fleet.tsx"
extract_section "ABOUT" "$SECTIONS_DIR/About.tsx"
extract_section "ADVANTAGES" "$SECTIONS_DIR/Advantages.tsx"
extract_section "CONTACT" "$SECTIONS_DIR/Contact.tsx"

# 2. Extract Home Page Component
extract_section "PAGE" "$APP_DIR/page.tsx"

# 3. Add Premium Typography Imports to globals.css if not already present
if [ -f "$GLOBALS_CSS" ]; then
    IMPORT_RULE="@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700&display=swap');"
    
    if ! grep -q "Cormorant Garamond" "$GLOBALS_CSS"; then
        echo -e "Adding Google Font imports to ${YELLOW}$GLOBALS_CSS${NC}..."
        # Insert font import at the very top of globals.css
        echo -e "${IMPORT_RULE}\n$(cat $GLOBALS_CSS)" > "$GLOBALS_CSS"
    else
        echo -e "Fonts already imported in globals.css."
    fi

    # Append utility font helper definitions if not present
    if ! grep -q "font-luxury-serif" "$GLOBALS_CSS"; then
        echo -e "Appending premium design tokens to ${YELLOW}$GLOBALS_CSS${NC}..."
        cat <<EOT >> "$GLOBALS_CSS"

/* Premium Custom Design Tokens for Octo Air */
@layer utilities {
  .font-luxury-serif {
    font-family: 'Cormorant Garamond', serif;
  }
  .font-luxury-sans {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
}
EOT
    fi
else
    echo -e "Warning: ${YELLOW}$GLOBALS_CSS${NC} not found. Skipping font integration. Please manually import Google Fonts 'Cormorant Garamond' and 'Plus Jakarta Sans' into your styles."
fi

echo -e "${GREEN}✓ Split complete. All sections have been successfully updated!${NC}"