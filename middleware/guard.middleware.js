const guard = (validating_body = []) => {
    return (request, _response, next) => {
        const required_items = []
        const low_length_items = []
        const keys = Object.keys(request.body)
        validating_body.forEach(element => {
            const ispresent = keys.find((item) => { return item === element })
            if (!ispresent) {
                required_items.push(`${element}`)
                return

            }
            if (request_body[ispresent].length === 0) {
                low_length_items.push(ispresent)
                return
            }
            // console.log(required_items)
        });
        request.not_present = required_items
        request.empty = low_length_items
        next()
    }
}
export default guard