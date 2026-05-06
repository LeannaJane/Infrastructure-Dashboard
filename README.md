# Minimal Cloud Infrastructure Console

A simple web console for managing remote cloud infrastructure. It connects a React frontend to Ansible automation through a FastAPI backend.

---

## Overview

This project provides a straightforward way to run commands on remote machines from a browser. It handles SSH connections and Ansible execution behind the scenes.

---

## Project Structure
├── frontend/ # React dashboard (Tailwind CSS v4)
├── backend/ # FastAPI server
├── ansible/ configuration

---

## How It Works

1. The frontend sends a request based on user input.
2. The backend receives the request and runs a Python subprocess.
3. The subprocess executes an Ansible command.
4. Ansible connects to the remote machine via SSH.
5. Output is returned and shown in the browser.

---

## Setup

### 1. Remote Machine

- Use an Ubuntu VM (e.g. on Google Cloud)
- Make sure SSH is enabled
- Add your public key to: ~/.ssh/authorized_keys

---

### 2. Backend

```bash
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    pip install fastapi uvicorn
    uvicorn main:app --reload
```

### 3. Frontend

```bash
    cd frontend
    npm install
    npm run dev
```

Create a .env file in the frontend directory:
Add your Server IP: 

```bash
    VITE_TARGET_IP=YOUR_SERVER_IP_HERE
```

### 4. Ansible
Copy the example file:

```bash
    cp ansible/hosts.example.ini ansible/hosts.ini
```
Edit ansible/hosts.ini and replace the placeholders with your server IP, SSH username, and the path to your private key.