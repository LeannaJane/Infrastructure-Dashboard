from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import subprocess

app = FastAPI()

# Allows react app to talk to python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "Status": "Dashboard Brain is online",
        "Note": "Target configured in Ansible hosts file"
    }

# Route, it olistens to speicifcally for the message sent from react
@app.get("/ping-server")

def ping_server():
    cmd = "ansible gcp_server -i ../ansible/hosts.ini -m ping"
    try:
        # This tells python to open a hidden terminal window on device and type this command.
        result = subprocess.check_output(cmd, shell=True, stderr=subprocess.STDOUT)
        return {
            "status": "success",
            "output": result.decode('utf-8') # Ansible sends back in binary - this translates it into human readable text
        }
    except subprocess.CalledProcessError as e:
        # These lines must also be indented exactly 8 spaces
        return {
            "status": "error",
            "output": e.output.decode('utf-8')
        }
