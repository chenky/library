/**
 * 简单的虚拟dom对象转换成html
 */
const obj = {
    tag: 'div',
    children: [
        { tage: 'span', children: 'hello world' }
    ]
}
function render(obj, root) {
    const { tag, children } = obj
    if (typeof tag !== 'string') return root
    const el = document.createElement(tag)
    if (Array.isArray(children)) {
        children.forEach(child => render(child, el))
    } else if (typeof children === 'string') {
        const text = document.createTextNode(children)
        el.appendChild(text)
    } else {
        throw new Error("render function arguments of obj.children must be array or string!")
    }
    root.appendChild(el)
}