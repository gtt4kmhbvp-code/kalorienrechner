#!/usr/bin/env python3
"""
Icon Generator for Kalorienrechner PWA
Converts SVG icons to PNG at various sizes
"""

import os
from pathlib import Path

try:
    from PIL import Image
    import cairosvg
    SVG_AVAILABLE = True
except ImportError:
    SVG_AVAILABLE = False
    print("⚠️  Warning: cairosvg or PIL not available")
    print("Install with: pip install cairosvg pillow")

def generate_png_from_svg(svg_path, output_path, size):
    """Convert SVG to PNG at specified size"""
    if not SVG_AVAILABLE:
        print(f"❌ Cannot convert {svg_path} - dependencies missing")
        return False
    
    try:
        print(f"🔄 Converting {Path(svg_path).name} → {Path(output_path).name} ({size}x{size})")
        cairosvg.svg2png(
            url=str(svg_path),
            write_to=str(output_path),
            output_width=size,
            output_height=size
        )
        print(f"✓ Created {output_path}")
        return True
    except Exception as e:
        print(f"❌ Error converting {svg_path}: {e}")
        return False

def create_simple_png_fallback(output_path, size, color=(44, 62, 80)):
    """Create a simple solid-color PNG as fallback"""
    try:
        img = Image.new('RGB', (size, size), color)
        img.save(output_path)
        print(f"✓ Created fallback PNG: {output_path}")
        return True
    except Exception as e:
        print(f"❌ Error creating fallback PNG: {e}")
        return False

def main():
    script_dir = Path(__file__).parent
    icons_dir = script_dir / 'icons'
    
    # Create icons directory if it doesn't exist
    icons_dir.mkdir(exist_ok=True)
    
    print("🎨 Kalorienrechner Icon Generator\n")
    
    # SVG source
    svg_source = icons_dir / 'icon-192.svg'
    
    if not svg_source.exists():
        print(f"❌ Source SVG not found: {svg_source}")
        return False
    
    # Icon sizes to generate
    sizes = {
        'icon-192.png': 192,
        'icon-512.png': 512,
        'apple-touch-icon.png': 180
    }
    
    success = True
    
    for filename, size in sizes.items():
        output_path = icons_dir / filename
        
        # Try SVG conversion
        if SVG_AVAILABLE:
            if not generate_png_from_svg(str(svg_source), str(output_path), size):
                success = False
        else:
            # Fallback to simple solid color
            print(f"⚠️  SVG conversion unavailable, creating solid-color fallback")
            if not create_simple_png_fallback(str(output_path), size):
                success = False
    
    print("\n" + "="*50)
    if success:
        print("✅ Icon generation completed successfully!")
        print("\n📁 Generated icons:")
        for filename in sizes.keys():
            icon_path = icons_dir / filename
            if icon_path.exists():
                size_kb = icon_path.stat().st_size / 1024
                print(f"  ✓ {filename} ({size_kb:.1f} KB)")
    else:
        print("⚠️  Icon generation completed with warnings")
        print("\n💡 To generate proper PNG icons:")
        print("   pip install cairosvg pillow")
        print("   python3 generate_icons.py")
    
    print("\n💡 Or use online tools:")
    print("  - https://www.pwabuilder.com/imageGenerator")
    print("  - https://cloudconvert.com/svg-to-png")
    print("="*50)
    
    return success

if __name__ == '__main__':
    main()
