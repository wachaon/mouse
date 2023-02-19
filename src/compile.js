const WShell = require('WScript.Shell')

const { resolve, basename, extname, toWin32Sep } = require('pathname')
const { existsFileSync } = require('filesystem')
const { execCommand } = require('utility')
const isCLI = require('isCLI')
const { unnamed } = require('argv')

let pkg = __dirname
while (true) {
    if (existsFileSync(resolve(pkg, 'package.json'))) break
    if (pkg === process.cwd()) break
    pkg = resolve(pkg, '..')
}

if (isCLI(__filename)) {
    const spec = unnamed.slice(1)
    if (!spec.length) throw new Error('You must specify a file to compile')
    compile(...spec)
} else module.exports = compile

function compile(...specs) {
    const files = specs.map(spec => {
        const _spec = resolve(pkg, spec)
        const filename = basename(spec, extname(spec))
        return {
            output: resolve(pkg, filename + '.exe'),
            input: toWin32Sep(_spec)
        }
    })

    const versions = [
        "v4.0.30319",
        "V3.5",
        "V3.0",
        "v2.0.50727",
        "v1.1.4322",
        "v1.0.3705"
    ]

    const compiler = versions
        .map(version => {
            return toWin32Sep(
                resolve(
                    WShell.ExpandEnvironmentStrings("%SystemRoot%"),
                    "Microsoft.NET/Framework",
                    version,
                    "csc.exe"
                )
            )
        })
        .find(exe => existsFileSync(exe))

    files.forEach(file => {
        const command = `${compiler} /target:exe /out:${file.output} ${file.input}`
        console.log(execCommand(command))
    })
}
