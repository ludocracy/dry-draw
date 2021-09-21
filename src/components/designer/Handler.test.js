const Handler = require("./Handler")
// @ponicode
describe("onMouseDown", () => {
    let inst

    beforeEach(() => {
        inst = new Handler.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.onMouseDown({ target: { classList: false } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.onMouseDown({ target: { classList: true } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.onMouseDown(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
