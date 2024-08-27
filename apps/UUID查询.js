import { Plugin, segment } from 'node-karin'

export class uuid extends Plugin {
  constructor () {
    super({
      name: 'MinecraftUUID',
      dsc: 'MinecraftUUID查询',
      /** 监听事件 具体请查看事件分类 */
      event: 'message',
      /** 插件的优先级 必须为数字 数字越小优先级越高 默认5000 */
      priority: 5000,
      rule: [
        {
          /** 命令正则匹配 */
          reg: /^#MCuuid$/,
          /** 正则对应的执行方法 */
          fnc: 'MCuuid',
          /** 是否显示操作日志 默认显示 */
          log: true,
          /** 操作权限 all | admin | master | group.admin | group.owner */
          permission: 'all'
        }
      ]
    })
  }

  async MCuuid () {
    const name = message.content.split("#MCuuid");
    const url = `https://api.mojang.com/users/profiles/minecraft/${name}`
    
    const parts = url.split("#MCuuid");
    const result = parts[1]; // 结果是 "123456"
    console.log(result); 
    /**
     * 将多个元素放在一起发送...
     * 这里只是一个例子，正常情况语音和视频是不支持组合发送的。
     */
    const msg = [
      segment.text('下面是一张图片：'),
      segment.image('https://www.example.com/example.png'),
      segment.text('下面是一段语音：'),
      segment.record('https://www.example.com/example.mp3'),
      segment.text('下面是一个视频：'),
      segment.video('https://www.example.com/example.mp4'),
      segment.text('下面是一个AT：'),
      segment.at('888888')
    ]

    /**
     * 这里是快捷操作方法
     * 也称回复消息附加选项
     * 以下选项，均为可选项，不填写则不会执行对应操作
     */
    const options = {
      /** 设置为true 则会在发送消息的时候自动在前方加上AT 对象是消息的触发者 */
      at: true,
      /** 设置为true 则会在发送消息的时候自动附加一个引用回复 对象是消息触发者 */
      reply: true,
      /** 这里需要是数字，代表消息发送成功后，多少秒后撤回消息 */
      recallMsg: 10
    }

    await this.reply(msg, options)

    return true
  }
}