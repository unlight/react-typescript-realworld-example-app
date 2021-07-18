import Error3 from 'rerror';

it('test error', () => {
    const innerError = new Error3({
        name: 'Foo name',
    });
    const innerError2 = new Error3({
        name: 'Bar name',
        message: 'Bar message',
        cause: innerError,
    });
});
