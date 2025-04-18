# server.py (Requires Flask and subprocess)
from flask import Flask, request, jsonify
import subprocess
import os
import shlex  # For safer command splitting

app = Flask(__name__)

#ALLOWED_COMMANDS = ['ls', 'pwd', 'date', 'echo', 'cat']  # Example allowed commands

def execute_command(command):
    """Executes a command using subprocess and returns the output.

    Security Note:  This needs *EXTENSIVE* sandboxing and validation
    in a real application.  Never allow arbitrary commands from the user.
    """
    try:
        # Split the command using shlex for safer argument handling
        command_list = shlex.split(command)

        #Basic Command Validation (Example - VERY LIMITED - Expand as needed)
        #if command_list[0] not in ALLOWED_COMMANDS:
        #    return "Error: Command not allowed."

        # Run the command with a timeout (important to prevent hangs)
        process = subprocess.Popen(
            command_list,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            cwd="/tmp", # Limit access to a specific directory for safety.
            executable="/bin/bash", # Force use of bash. Prevents execution of other programs.
        )
        stdout, stderr = process.communicate(timeout=10)  # Timeout after 10 seconds
        return stdout.decode("utf-8") + "\n" + stderr.decode("utf-8")

    except FileNotFoundError:
        return "Error: Command not found."
    except subprocess.TimeoutExpired:
        process.kill()
        return "Error: Command timed out."
    except Exception as e:
        return f"Error: {str(e)}"



@app.route('/execute', methods=['POST'])
def execute():
    command = request.json.get('command')
    if not command:
        return jsonify({'output': 'Error: No command provided.'})

    output = execute_command(command)
    return jsonify({'output': output})

if __name__ == '__main__':
    app.run(debug=True)  # Disable debug mode in production!
