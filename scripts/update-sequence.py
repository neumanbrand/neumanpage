import os
import sys
import glob
import re

if len(sys.argv) < 2:
    print("Uso: python3 scripts/update-sequence.py <ruta_de_la_nueva_carpeta>")
    print("Ejemplo: python3 scripts/update-sequence.py ~/Downloads/'Mi Nueva Secuencia'")
    sys.exit(1)

source_dir = os.path.expanduser(sys.argv[1])
if not os.path.exists(source_dir):
    print(f"Error: La carpeta '{source_dir}' no existe.")
    sys.exit(1)

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
target_dir = os.path.join(project_root, "public", "sequence")

# Buscar imágenes compatibles (.jpg, .jpeg, .png, .webp)
extensions = ("*.jpg", "*.jpeg", "*.png", "*.JPG", "*.JPEG", "*.PNG", "*.webp")
source_files = []
for ext in extensions:
    source_files.extend(glob.glob(os.path.join(source_dir, ext)))

if not source_files:
    print(f"Error: No se encontraron imágenes en '{source_dir}'.")
    sys.exit(1)

# Ordenamiento numérico natural (para que 2 venga antes que 10)
def natural_sort_key(s):
    return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', s)]

source_files.sort(key=natural_sort_key)
total = len(source_files)
print(f"-> Se encontraron {total} fotogramas en la nueva carpeta.")

# 1. Vaciar secuencia anterior
os.makedirs(target_dir, exist_ok=True)
for f in os.listdir(target_dir):
    p = os.path.join(target_dir, f)
    if os.path.islink(p) or os.path.isfile(p):
        os.remove(p)

print(f"-> Secuencia anterior eliminada con éxito.")

# 2. Enlazar / copiar nuevos fotogramas ordenados como frame_0000.jpg ...
for i, src in enumerate(source_files):
    dst = os.path.join(target_dir, f"frame_{i:04d}.jpg")
    try:
        os.link(src, dst) # Enlace directo APFS (0 bytes extra)
    except Exception:
        import shutil
        shutil.copy2(src, dst)

print(f"-> Nuevos {total} fotogramas vinculados como frame_0000.jpg a frame_{total-1:04d}.jpg.")

# 3. Actualizar TOTAL_FRAMES automáticamente en timelineConfig.ts
config_path = os.path.join(project_root, "src", "components", "scrollytelling", "timelineConfig.ts")
if os.path.exists(config_path):
    with open(config_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Reemplazar TOTAL_FRAMES
    content = re.sub(r'export const TOTAL_FRAMES\s*=\s*\d+;', f'export const TOTAL_FRAMES = {total};', content)
    
    # Recalcular frames de los 4 capítulos proporcionalmente
    f1_end = int(total * 0.25)
    f2_start = f1_end + 1
    f2_end = int(total * 0.55)
    f3_start = f2_end + 1
    f3_end = int(total * 0.81)
    f4_start = f3_end + 1
    f4_end = total - 1

    content = re.sub(r'(id:\s*"origen"[\s\S]*?endFrame:\s*)\d+', rf'\g<1>{f1_end}', content)
    content = re.sub(r'(id:\s*"metamorfosis"[\s\S]*?startFrame:\s*)\d+([\s\S]*?endFrame:\s*)\d+', rf'\g<1>{f2_start}\g<2>{f2_end}', content)
    content = re.sub(r'(id:\s*"estructura"[\s\S]*?startFrame:\s*)\d+([\s\S]*?endFrame:\s*)\d+', rf'\g<1>{f3_start}\g<2>{f3_end}', content)
    content = re.sub(r'(id:\s*"identidad"[\s\S]*?startFrame:\s*)\d+([\s\S]*?endFrame:\s*)\d+', rf'\g<1>{f4_start}\g<2>{f4_end}', content)

    with open(config_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"-> timelineConfig.ts actualizado automáticamente a {total} fotogramas y capítulos calibrados.")

print("\n LISTO! Secuencia renovada y sincronizada al instante.")
