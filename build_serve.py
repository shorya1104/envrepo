import subprocess
import os
# Navigate to the root directory of your React app
dir_path = "build"
# os.chdir(app_dir)
if os.path.exists(dir_path) and os.path.isdir(dir_path):
    print("Directory exists")
    os.system("rm -r '{}'".format(dir_path))
    subprocess.run(["npm", "install"])
    subprocess.run(["npm", "run", "build"])
else:
    print("Directory does not exist")
    subprocess.run(["npm", "install"])
    subprocess.run(["npm", "run", "build"])

