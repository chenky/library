import os from 'os'

function getIPAddress () {
    const networkInterfaces = os.networkInterfaces()

    for (const interfaceName in networkInterfaces) {
        const interfaces = networkInterfaces[interfaceName]

        if (interfaces) {
            for (const iface of interfaces) {
                if (iface.family === 'IPv4' && !iface.internal) {
                    return iface.address
                }
            }
        }
    }

    return '0.0.0.0' // 默认使用 localhost
}