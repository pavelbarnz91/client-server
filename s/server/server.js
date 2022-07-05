const path = require('path');
const http = require('http');
const fs = require('fs');
const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const static = require('koa-static');
const Router = require('koa-router');
const router = new Router();

app.use(cors());
app.use(static(path.join(__dirname, '/public')));

app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, './public'),
        keepExtensions: true,
    }
}))


router.post('', async ctx => {
    const file = ctx.request.files.file;
    const baseName = path.basename(file.filepath);
    console.log({'url': `${ctx.origin}/public/${baseName}`});
    ctx.response.body = {'url': `${ctx.origin}/public/${baseName}`};
})

app.use(router.routes());
const server = http.createServer(app.callback()).listen(9090);