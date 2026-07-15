import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig(
{
    srcDir: 'src',
    modules: ['@wxt-dev/module-react'],
    manifest:
    {
        name: 'Focus Sprout',
        description: '집중할수록 작은 식물이 자라는 포모도로 타이머',
        permissions: ['storage', 'alarms'],
    },
});
