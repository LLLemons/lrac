import { ApplyPluginsType } from '/Users/lemons/code/library/node_modules/@umijs/runtime/dist/index.js';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "component": (props) => require('react').createElement(require('/Users/lemons/code/library/node_modules/@umijs/preset-dumi/lib/themes/default/layout.js').default, {
      ...{"menus":{"*":{"/components":[{"title":"Form-table","path":"/components/form-table","meta":{},"children":[{"path":"/components/form-table","title":"FormTable","meta":{}}]}],"/guide-start":[{"path":"/guide-start","title":"快速开始","meta":{}}],"*":[{"path":"/","title":"Hello Lrac!","meta":{}}]}},"locales":[],"navs":{"*":[{"title":"组件","path":"/components"},{"title":"快速开始","path":"/guide-start"}]},"title":"lrac","mode":"site"},
      ...props,
    }),
    "routes": [
      {
        "path": "/components/form-table",
        "component": require('../../FormTable/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/FormTable/index.md",
          "updatedTime": 1585556818670,
          "title": "FormTable",
          "nav": {
            "title": "组件",
            "path": "/components"
          },
          "slugs": [
            {
              "depth": 3,
              "value": "API",
              "heading": "api"
            }
          ],
          "group": {
            "path": "/components/form-table",
            "title": "Form-table"
          }
        },
        "title": "FormTable"
      },
      {
        "path": "/guide-start",
        "component": require('../../../docs/guide-start.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/guide-start.md",
          "updatedTime": 1585547378328,
          "title": "快速开始",
          "nav": {
            "title": "快速开始",
            "path": "/guide-start"
          },
          "slugs": []
        },
        "title": "快速开始"
      },
      {
        "path": "/",
        "component": require('../../../docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1585546911545,
          "hero": {
            "title": "Lrac",
            "desc": "lemon's components based on react16.8 and antd4",
            "actions": [
              {
                "text": "快速开始",
                "link": "/guide-start"
              }
            ]
          },
          "features": [
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png",
              "title": "Feature 1",
              "desc": "<div class=\"markdown\"><p>Balabala</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png",
              "title": "Feature 2",
              "desc": "<div class=\"markdown\"><p>Balabala</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png",
              "title": "Feature 3",
              "desc": "<div class=\"markdown\"><p>Balabala</p></div>"
            }
          ],
          "footer": "<div class=\"markdown\"><p>Open-source MIT Licensed | Copyright © 2020<br />Powered by <a href=\"https://d.umijs.org\" target=\"_blank\">dumi<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" width=\"15\" height=\"15\" class=\"__dumi-default-external-link-icon\"><path fill=\"currentColor\" d=\"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z\"></path><polygon fill=\"currentColor\" points=\"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9\"></polygon></svg></a></p></div>",
          "slugs": [
            {
              "depth": 2,
              "value": "Hello Lrac!",
              "heading": "hello-lrac"
            }
          ],
          "title": "Hello Lrac!"
        },
        "title": "Hello Lrac!"
      },
      {
        "path": "/components",
        "meta": {},
        "exact": true,
        "redirect": "/components/form-table"
      }
    ],
    "title": "lrac"
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
