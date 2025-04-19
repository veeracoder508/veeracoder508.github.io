import requests
import time
import subprocess
from datetime import datetime
import os

# URL of your GitHub Pages site
GITHUB_PAGES_URL = "https://veeracoder508.github.io"

# Path to the local repository where the script resides
REPO_PATH = os.path.dirname(os.path.abspath(__file__))

# File to store the live status in the repository
STATUS_FILE = os.path.join(REPO_PATH, "livestatus.txt")

def check_status():
    """
    Function to check the status of the GitHub Pages site.
    """
    try:
        response = requests.get(GITHUB_PAGES_URL, timeout=10)
        if response.status_code == 200:
            return "Online"
        else:
            return f"Error (Status Code: {response.status_code})"
    except requests.exceptions.RequestException as e:
        return f"Offline (Error: {e})"

def log_status(status):
    """
    Function to log the status to a file and commit it to the repository.
    """
    # Log the status to the file
    with open(STATUS_FILE, "a") as file:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        file.write(f"[{timestamp}] Status: {status}\n")
        print(f"[{timestamp}] Status: {status}")

    # Commit and push the changes to the repository
    commit_and_push_changes()

def commit_and_push_changes():
    """
    Function to commit and push changes to the GitHub repository.
    """
    try:
        # Change to the repository directory
        os.chdir(REPO_PATH)

        # Add the changes
        subprocess.run(["git", "add", "livestatus.txt"], check=True)

        # Commit the changes
        subprocess.run(["git", "commit", "-m", "Update livestatus.txt with the latest status"], check=True)

        # Push the changes
        subprocess.run(["git", "push"], check=True)
        print("Changes pushed to the repository successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error during git operation: {e}")

def main():
    """
    Main function to check the status every 30 minutes.
    """
    while True:
        status = check_status()
        log_status(status)
        # Wait for 30 minutes (1800 seconds)
        time.sleep(1800)

if __name__ == "__main__":
    main()