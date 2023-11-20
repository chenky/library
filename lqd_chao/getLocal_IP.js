import os from 'os'

function getIPAddress() {
    const networkInterfaces = os.networkInterfaces();
    let result = '0.0.0.0'; // 默认使用 localhost
  
    Object.keys(networkInterfaces).forEach((interfaceName) => {
      const interfaces = networkInterfaces[interfaceName];
  
      if (interfaces) {
        interfaces.forEach((iface) => {
          if (iface.family === 'IPv4' && !iface.internal) {
            result = iface.address;
          }
        });
      }
    });
  
    return result;
  }