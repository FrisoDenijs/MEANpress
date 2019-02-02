export const TestController = {
    Get: () => { return { message: 'get test success' }; },
    Post: (body: any) => { return { body: body, message: 'post test success' } }
}
