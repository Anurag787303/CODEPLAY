import os, filecmp, sys, subprocess, json


codes = {200:'success',404:'file not found',400:'error',408:'timeout'}

def compile(file, lang, path):
    if lang == 'python3':
        return 200, None
    
    if os.path.isfile(file):
        compile_cmd = ''
        if lang == 'c':
            compile_cmd = ['gcc', file]
        elif lang == 'cpp':
            compile_cmd = ['g++', file]
        elif lang == 'java':
            compile_cmd = ['javac', file]

        if compile_cmd:
            result = subprocess.run(compile_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            if result.returncode == 0:
                return 200, None
            else:
                return 400, result.stderr.decode('utf-8')
        else:
            return 400, "Unsupported language"
    else:
        return 404, "Source file not found"

def run(file, input, timeout, lang):
    # cmd = 'sudo -u judge '
    cmd = ''

    if lang == 'java':
        cmd = ['java', 'Main']
    elif lang == 'c' or lang == 'cpp':
        cmd = ['./a.out']
    elif lang == 'python3':
        cmd = ['python3', file]

    result = subprocess.run(
        ['timeout', str(timeout)] + cmd,
        stdin=open(input, 'r'), stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )
    
    if result.returncode == 0:
        return 200, result.stdout.decode('utf-8')
    elif result.returncode == 31744:
        return 408, "Execution timed out"
    else:
        return 400, result.stderr.decode('utf-8')

def match(output):
    if os.path.isfile('out.txt') and os.path.isfile(output):
        b = filecmp.cmp('out.txt',output)
        os.remove('out.txt')
        return b
    else:
        return 404

params = sys.argv
file = params[1].split('/')[3]
path = './temp/' + params[1].split('/')[2] + '/'
os.chdir(path)
lang = params[2]
timeout = str(min(5, int(params[3])))

testin = "input.txt"
testout = "output.txt"

status, data = compile(file, lang, path)
if status == 200:
    status, data = run(file, testin, timeout, lang)

print(json.dumps({'status':codes[status], 'data':data}))
