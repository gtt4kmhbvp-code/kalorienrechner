#!/usr/bin/env python3
"""
Kalorienrechner Icon Upgrader
Generates professional PNG icons from SVG using PIL
"""

import io
import os
import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False
    print("❌ PIL not installed. Running: pip install pillow")
    os.system(f"{sys.executable} -m pip install pillow")
    try:
        from PIL import Image, ImageDraw, ImageFont
        PIL_AVAILABLE = True
    except:
        PIL_AVAILABLE = False

def create_professional_icon(size, filename):
    """Create a professional Kalorienrechner icon"""
    
    # Create image with gradient background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Brand colors (matching app theme)
    primary = (44, 62, 80)      # #2c3e50 - Dark blue
    secondary = (52, 152, 219)  # #3498db - Light blue
    accent = (231, 76, 60)      # #e74c3c - Red
    white = (236, 240, 241)     # #ecf0f1 - Off white
    
    # Draw rounded background
    margin = int(size * 0.05)
    radius = int(size * 0.15)
    
    # Background rectangle with rounded corners
    draw.rounded_rectangle(
        [(margin, margin), (size - margin, size - margin)],
        radius=radius,
        fill=primary
    )
    
    # Draw gradient effect (simulate with circles)
    center = size // 2
    circle_size = int(size * 0.35)
    
    # Main apple/food symbol (circle with gradient colors)
    apple_pos = (center - circle_size // 2, int(size * 0.25) - circle_size // 2)
    draw.ellipse(
        [apple_pos, (apple_pos[0] + circle_size, apple_pos[1] + circle_size)],
        fill=secondary,
        outline=accent,
        width=2
    )
    
    # Leaf on apple (small triangle/shape)
    leaf_start_x = apple_pos[0] + circle_size - 10
    leaf_start_y = apple_pos[1]
    draw.line(
        [(leaf_start_x, leaf_start_y), (leaf_start_x + 15, leaf_start_y - 10)],
        fill=accent,
        width=max(2, int(size * 0.02))
    )
    
    # Draw calculation symbol area
    calc_y = int(size * 0.55)
    
    # Horizontal line (division)
    line_length = int(size * 0.25)
    draw.rectangle(
        [(center - line_length // 2, calc_y), (center + line_length // 2, calc_y + 3)],
        fill=white
    )
    
    # Vertical line (plus)
    draw.rectangle(
        [(center - 2, calc_y - line_length // 3), (center + 2, calc_y + line_length // 3)],
        fill=white
    )
    
    # Draw macronutrient labels at bottom
    label_y = int(size * 0.75)
    label_size = int(size * 0.08)
    
    # Calculate label positions
    labels = ['P', 'C', 'F']
    colors = [secondary, accent, (243, 156, 18)]  # Blue, Red, Orange
    x_positions = [
        int(size * 0.15),
        int(size * 0.5),
        int(size * 0.85)
    ]
    
    for label, color, x in zip(labels, colors, x_positions):
        # Draw filled circle background
        circle_radius = int(size * 0.06)
        draw.ellipse(
            [(x - circle_radius, label_y - circle_radius),
             (x + circle_radius, label_y + circle_radius)],
            fill=color
        )
        
        # Draw label (with large font size for visibility)
        # Using basic ASCII art since fonts are complex
        draw.text((x - 2, label_y - 3), label, fill=white)
    
    return img

def main():
    script_dir = Path(__file__).parent
    icons_dir = script_dir / 'icons'
    
    if not PIL_AVAILABLE:
        print("❌ Cannot generate icons - PIL not available")
        return False
    
    print("🎨 Kalorienrechner Professional Icon Generator\n")
    
    sizes = {
        'icon-192.png': 192,
        'icon-512.png': 512,
        'apple-touch-icon.png': 180
    }
    
    success = True
    
    for filename, size in sizes.items():
        try:
            output_path = icons_dir / filename
            print(f"🔄 Generating {filename} ({size}×{size})...")
            
            # Create icon
            icon = create_professional_icon(size, filename)
            
            # Save as PNG
            icon.save(output_path, 'PNG', quality=95)
            
            file_size_kb = output_path.stat().st_size / 1024
            print(f"✓ Created {filename} ({file_size_kb:.1f} KB)\n")
            
        except Exception as e:
            print(f"❌ Error creating {filename}: {e}\n")
            success = False
    
    print("=" * 50)
    if success:
        print("✅ Professional icons generated successfully!")
        print("\nGenerated files:")
        for filename in sizes.keys():
            icon_path = icons_dir / filename
            if icon_path.exists():
                size_kb = icon_path.stat().st_size / 1024
                print(f"  ✓ {filename} ({size_kb:.1f} KB)")
        
        print("\n📝 Next steps:")
        print("  git add icons/*.png")
        print("  git commit -m 'assets: Upgrade to professional PNG icons'")
        print("  git push")
        print("\n✅ GitHub Pages auto-deploys in 1-2 minutes!")
        
    else:
        print("⚠️  Icon generation completed with errors")
    
    print("=" * 50)
    return success

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)
