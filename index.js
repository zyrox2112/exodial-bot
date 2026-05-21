require('dotenv').config();

const config = require('./config.json');

const {
    Client,
    GatewayIntentBits,
    Partials,
    PermissionsBitField,
    ChannelType,

    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,

    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    StringSelectMenuBuilder,
    SlashCommandBuilder,
    REST,
    Routes,

    Events
} = require('discord.js');

const client = new Client({

    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],

    partials: [
        Partials.Channel
    ]
});

let ticketCounter = 1;
let vouchCounter = 1;
const slashCommands = [

    new SlashCommandBuilder()
        .setName('help')
        .setDescription('Muestra la ayuda'),

    new SlashCommandBuilder()
        .setName('say')
        .setDescription('Enviar mensaje')
        .addStringOption(option =>
            option.setName('mensaje')
                .setDescription('Mensaje')
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Enviar embed')
        .addStringOption(option =>
            option.setName('mensaje')
                .setDescription('Mensaje')
                .setRequired(true)
        ),

    new SlashCommandBuilder()
 
        .setName('rename')
        .setDescription('Renombrar ticket')
        .addStringOption(option =>
            option.setName('nombre')
                .setDescription('Nuevo nombre')
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName('nick')
        .setDescription('Cambiar apodo')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuario')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('apodo')
                .setDescription('Nuevo apodo')
.setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName('dmall')
        .setDescription('Enviar MD a todos')
];

client.once('ready', async () => {

    console.log(`✅ ${client.user.tag} online`);

    client.user.setPresence({
        activities: [
            {
                name: 'Exødial Støck',
                type: 3
            }
        ],

        status: 'online'
    });

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    try {

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            {
                body: slashCommands
            }
        );

        console.log('✅ Slash commands cargados');

    } catch (error) {

        console.log(error);
    }

    const ticketChannel = client.channels.cache.get(config.ticketsChannel);

    if (ticketChannel) {

        const messages = await ticketChannel.messages.fetch({ limit: 20 });

        const botMessages = messages.filter(msg =>
            msg.author.id === client.user.id
        );

        if (botMessages.size > 0) {

            await ticketChannel.bulkDelete(botMessages, true).catch(() => {});
        }

        const embed = new EmbedBuilder()

            .setColor(config.color)

            .setTitle('🏷️ Ticket | System - Exødial')

            .setDescription(`
🇪🇸 · Hola! para abrir un ticket, debes presionar uno de los siguientes botones.

🇺🇸 · Hello! To open a ticket, you must press one of the following buttons.

© Exødial - Todos los derechos reservados.
            `)

            .setFooter({
                text: 'Exødial Gestion'
            });

        const row1 = new ActionRowBuilder()

            .addComponents(

                new ButtonBuilder()
                    .setCustomId('ticket_compra')
                    .setLabel('Compra')
                    .setEmoji('🛒')
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('ticket_soporte')
                    .setLabel('Soporte')
                    .setEmoji('🎧')
                    .setStyle(ButtonStyle.Secondary)
            );

        const row2 = new ActionRowBuilder()

            .addComponents(

                new ButtonBuilder()
                    .setCustomId('ticket_partner')
                    .setLabel('Partner')
                    .setEmoji('🔗')
                    .setStyle(ButtonStyle.Secondary)
            );

        await ticketChannel.send({

            embeds: [embed],

            components: [row1, row2]
        });
    }
    const shopChannel = client.channels.cache.get('1507113224816955534');

if (shopChannel) {

   const shopEmbed = new EmbedBuilder()

    .setColor('#5865F2')

    .setTitle('🛒 Exodial Stock | All Products')

    .setThumbnail(client.user.displayAvatarURL())

    .setDescription(`
> *¡Bienvenido/a a nuestro catálogo de productos, en el que podras ver todo acerca de nuestra tienda!*

> *Descubre nuestra variedad de productos disponibles y sus respectivos precios.*

> *Aceptamos todo tipo de Metodos De Pago, universalmente Crypto y PayPal fyf*
## 🛍️ Nuestros productos:

• <a:NITRO:1495072973449592933> __Nitro | Boost / Basic__
• <:Netflix6:1495087858778902548> __Streaming | Todo Tipo__
• <a:server_boost:1495072978860245103> __Server Boosts | 1M / 3M__
• <:Deco:1507110765600047196> __Decorations__
• <a:Robux:1495072975681097930> __Robux | Via Gamepass__
• <:TikTok:1495102970302304357> __Followers | Ig/TikTok__
• <:Discord:1507110676991053930> __Members | On/Off__

### 🎫 Para comprar alguno de nuestros diversos productos:
*Por favor, abra un ticket en* <#1494779889209835580>
    `)

    .setFooter({
        text: 'Exodial Stock, By exo.'
    });

    const shopMenu = new StringSelectMenuBuilder()

        .setCustomId('shop_menu')

        .setPlaceholder('Selecciona una categoría')

        .addOptions([
            {
                label: 'Nitro',
                value: 'nitro',
                emoji: '1495072973449592933'
            },
            {
                label: 'Streaming',
                value: 'streaming',
                emoji: '1495087858778902548'
            },
            {
                label: 'Server Boosts',
                value: 'boosts',
                emoji: '1495072978860245103'
            },
            {
                label: 'Decorations',
                value: 'decorations',
                emoji: '1507110765600047196'
            },
            {
                label: 'Robux',
                value: 'robux',
                emoji: '1495072975681097930'
            },
            {
                label: 'Members',
                value: 'members',
                emoji: '1507110676991053930'
            },
            {
                label: 'Followers',
                value: 'followers',
                emoji: '1495102970302304357'
            }
        ]);

    const shopRow = new ActionRowBuilder()

        .addComponents(shopMenu);

    await shopChannel.send({

        embeds: [shopEmbed],

        components: [shopRow]
    });
    const vouchChannel = client.channels.cache.get('1507151720096993430');

if (vouchChannel) {

    const vouchEmbed = new EmbedBuilder()

        .setColor('#5865F2')

        .setTitle('💬 Make A Vouch | Exodial Stock')

        .setThumbnail(client.user.displayAvatarURL())

        .setDescription(`
> ¿Compraste algo con nosotros?
> ¡Comparte tu experiencia con Exodial Stock!

## 🌟 ¿Cómo funciona?

➜ Presiona el botón de abajo  
➜ Completa el formulario  
➜ Tu review será enviada automáticamente  

### 💙 Tu opinión nos ayuda a mejorar.
        `)

        .setFooter({
            text: 'Exodial Stock • Vouch System'
        });

    const row = new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()
                .setCustomId('make_vouch')
                .setLabel('Make A Vouch')
                .setEmoji('💬')
                .setStyle(ButtonStyle.Primary)
        );

    await vouchChannel.send({

        embeds: [vouchEmbed],

        components: [row]
    });
}
}
});

function isStaff(member) {

    return member.roles.cache.has(config.staffRole);
}

client.on('guildMemberAdd', async member => {

    // CANAL BIENVENIDAS

    const channel = member.guild.channels.cache.get(config.welcomeChannel);

    if (!channel) return;

    // CANAL TAG

    const tagChannel = member.guild.channels.cache.get('1494781988056600676');

    // TAG AUTOMÁTICO

    if (tagChannel) {

        const pingMessage = await tagChannel.send(`${member}`);

        setTimeout(async () => {

            await pingMessage.delete().catch(() => {});

        }, 1000);
    }

    // BIENVENIDA

    const createdTimestamp = Math.floor(member.user.createdTimestamp / 1000);

    const joinedTimestamp = Math.floor(Date.now() / 1000);

    const embed = new EmbedBuilder()

        .setColor(config.color)

        .setAuthor({
            name: `${member.user.tag}`,
            iconURL: member.user.displayAvatarURL({ dynamic: true })
        })

        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))

        .setTitle('👋 Bienvenido/a a Exødial Støck')

        .setDescription(`
Esperamos que disfrutes tu estadía dentro del servidor ✨
        `)

        .addFields(

            {
                name: '👤 Usuario',
                value: `${member}`,
                inline: true
            },

            {
                name: '📅 Cuenta creada',
                value: `<t:${createdTimestamp}:R>`,
                inline: true
            },

            {
                name: '📥 Entró al servidor',
                value: `<t:${joinedTimestamp}:R>`,
                inline: true
            },

            {
                name: '📈 Miembros',
                value: `${member.guild.memberCount}`,
                inline: true
            }
        )

        .setFooter({
            text: 'Exødial Gestion'
        })

        .setTimestamp();

    channel.send({
        content: `${member}`,
        embeds: [embed]
    });
});

client.on('messageCreate', async message => {

    if (message.author.bot) return;

    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);

    const cmd = args.shift()?.toLowerCase();

    if (cmd === 'help') {

        const embed = new EmbedBuilder()

            .setColor(config.color)

            .setTitle('📘 Exødial Gestion')

            .setDescription(`
Sistema de gestión para **${config.serverName}**
            `)

            .addFields(

                {
                    name: '🎫 Tickets',
                    value:
`e!rename`,
                    inline: false
                },

                {
                    name: '📢 General',
                    value:
`e!help
e!say
e!embed`,
                    inline: false
                },

                {
                    name: '👤 Usuarios',
                    value:
`e!nick`,
                    inline: false
                }
            )

            .setFooter({
                text: 'Exødial Gestion'
            })

            .setTimestamp();

        return message.reply({
            embeds: [embed]
        });
    }

    if (cmd === 'say') {

        if (!isStaff(message.member)) {

            return message.reply('❌ No tienes permisos.');
        }

        const text = args.join(' ');

        if (!text) {

            return message.reply('❌ Escribe un mensaje.');
        }

        await message.delete().catch(() => {});

        return message.channel.send(text);
    }

    if (cmd === 'embed') {

        if (!isStaff(message.member)) {

            return message.reply('❌ No tienes permisos.');
        }

        const text = args.join(' ');

        if (!text) {

            return message.reply('❌ Escribe un mensaje.');
        }

        await message.delete().catch(() => {});

        const embed = new EmbedBuilder()

            .setColor(config.color)

            .setDescription(text)

            .setTimestamp();

        return message.channel.send({
            embeds: [embed]
        });
    }
if (cmd === 'dmall') {

    if (!isStaff(message.member)) {

        return message.reply('❌ No tienes permisos.');
    }

    await message.reply('📩 Enviando mensajes privados...');

    const members = await message.guild.members.fetch();

    let enviados = 0;

    for (const [, member] of members) {

        if (member.user.bot) continue;

        try {

            await member.send(`
${member}

please reaccion o ban **Exødial Støck 🦋**
<#1494781988056600676>
            `);

            enviados++;

        } catch (err) {

            console.log(`No se pudo enviar MD a ${member.user.tag}`);
        }

        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    message.channel.send(`✅ MD enviados a ${enviados} usuarios.`);
}
    if (cmd === 'rename') {

        if (!isStaff(message.member)) {

            return message.reply('❌ No tienes permisos.');
        }

        const name = args.join('-');

        if (!name) {

            return message.reply('❌ Escribe un nombre.');
        }

        await message.channel.setName(name);

        return message.reply(`✅ Ticket renombrado a ${name}`);
    }

    if (cmd === 'nick') {

        if (!isStaff(message.member)) {

            return message.reply('❌ No tienes permisos.');
        }

        const user = message.mentions.members.first();

        if (!user) {

            return message.reply('❌ Menciona un usuario.');
        }

        args.shift();

        const nickname = args.join(' ');

        if (!nickname) {

            return message.reply('❌ Escribe un apodo.');
        }

        await user.setNickname(nickname);

        return message.reply(`✅ Apodo cambiado.`);
    }
});

client.on(Events.InteractionCreate, async interaction => {

    if (interaction.isChatInputCommand()) {

        if (interaction.commandName === 'help') {

            const embed = new EmbedBuilder()

                .setColor(config.color)

                .setTitle('📘 Exødial Gestion')

                .setDescription(`
Sistema de gestión para **${config.serverName}**
                `)

                .addFields(

                    {
                        name: '🎫 Tickets',
                        value:
`/rename`,
                        inline: false
                    },

                    {
                        name: '📢 General',
                        value:
`/help
/say
/embed`,
                        inline: false
                    },

                    {
                        name: '👤 Usuarios',
                        value:
`/nick`,
                        inline: false
                    }
                )

                .setFooter({
                    text: 'Exødial Gestion'
                })

                .setTimestamp();

            return interaction.reply({
                embeds: [embed]
            });
        }

        if (interaction.commandName === 'say') {

            if (!isStaff(interaction.member)) {

                return interaction.reply({
                    content: '❌ No tienes permisos.',
                    ephemeral: true
                });
            }

            const text = interaction.options.getString('mensaje');

            return interaction.reply({
                content: text
            });
        }

        if (interaction.commandName === 'embed') {

            if (!isStaff(interaction.member)) {

                return interaction.reply({
                    content: '❌ No tienes permisos.',
                    ephemeral: true
                });
            }

            const text = interaction.options.getString('mensaje');

            const embed = new EmbedBuilder()

                .setColor(config.color)

                .setDescription(text)

                .setTimestamp();

            return interaction.reply({
                embeds: [embed]
            });
        }

        if (interaction.commandName === 'rename') {

            if (!isStaff(interaction.member)) {

                return interaction.reply({
                    content: '❌ No tienes permisos.',
                    ephemeral: true
                });
            }

            const name = interaction.options.getString('nombre');

            await interaction.channel.setName(name);

            return interaction.reply(`✅ Ticket renombrado.`);
        }

        if (interaction.commandName === 'nick') {

            if (!isStaff(interaction.member)) {

                return interaction.reply({
                    content: '❌ No tienes permisos.',
                    ephemeral: true
                });
            }

            const user = interaction.options.getMember('usuario');

            const nickname = interaction.options.getString('apodo');

            await user.setNickname(nickname);

            return interaction.reply(`✅ Apodo cambiado.`);
        }
    }
if (interaction.isStringSelectMenu()) {

    if (interaction.customId === 'shop_menu') {

        let embed;

        if (interaction.values[0] === 'nitro') {

            embed = new EmbedBuilder()

                .setColor(config.color)

                .setTitle('<a:NITRO:1495072973449592933> Nitro')

                .setDescription(`
<a:NITRO:1495072973449592933> Nitro Boost FW = 3.50$

<a:NITRO:1495072973449592933> Nitro Basic FW = 1$ Aprox

🎫 Abrir ticket:
<#1494779889209835580>
                `);
        }

        if (interaction.values[0] === 'streaming') {

            embed = new EmbedBuilder()

                .setColor(config.color)

                .setTitle('<:Netflix6:1495087858778902548> Streaming')

                .setDescription(`
<:unnamed:1495079713809629345> Disney+ = 0.40$

<:Netflix6:1495087858778902548> Netflix = 0.35$

<:7415crunchyroll:1495079712655937609> Crunchyroll = 0.50$

🏆 UFC = 0.25$

🏀 NBA = 0.25$

💥 WWE = 0.20$

<:steam:1495079714526597240> Steam Fresh Acc = 0.25$

<:62970hbomax:1495079711422812241> HBO Max = 0.60$

<:26439amazonprime:1495087860318077231> Amazon Prime Video = 0.50$

<:Spotify:1495087865791512819> Spotify Premium Key 12m = 1$ - 3$

<:Spotify:1495087865791512819> Spotify Premium FA Acc 12m = 2$

📺 Paramount = 0.50$

🎫 Abrir ticket:
<#1494779889209835580>
                `);
        }

        if (interaction.values[0] === 'boosts') {

            embed = new EmbedBuilder()

                .setColor(config.color)

                .setTitle('<a:server_boost:1495072978860245103> Server Boosts')

                .setDescription(`
<a:server_boost:1495072978860245103> 1 Month Server Boosts: x14 Boosts = 4.50$

<a:server_boost:1495072978860245103> 3 Month Server Boosts: x14 Boosts = 6.50$

🎫 Abrir ticket:
<#1494779889209835580>
                `);
        }

        if (interaction.values[0] === 'decorations') {

            embed = new EmbedBuilder()

                .setColor(config.color)

                .setTitle('<:Deco:1507110765600047196> Decorations')

                .setDescription(`
<:Deco:1507110765600047196> 4.99€ → 1.80$

<:Deco:1507110765600047196> 5.99€ → 1.90$

<:Deco:1507110765600047196> 6.99€ → 2.10$

<:Deco:1507110765600047196> 7.99€ → 2.25$

<:Deco:1507110765600047196> 8.49€ → 3.20$

<:Deco:1507110765600047196> 9.99€ → 3.65$

<:Deco:1507110765600047196> 11.99€ → 3.90$

🎫 Abrir ticket:
<#1494779889209835580>
                `);
        }

        if (interaction.values[0] === 'robux') {

            embed = new EmbedBuilder()

                .setColor(config.color)

                .setTitle('<a:Robux:1495072975681097930> Robux')

                .setDescription(`
<a:Robux:1495072975681097930> 1k Robux Leg4l Pa1d Via Gamepass = 6.5$

<a:Robux:1495072975681097930> Robux Panel = 6.60$

🎫 Abrir ticket:
<#1494779889209835580>
                `);
        }

        if (interaction.values[0] === 'members') {

            embed = new EmbedBuilder()

                .setColor(config.color)

                .setTitle('<:Discord:1507110676991053930> Miembros')

                .setDescription(`
<:Discord:1507110676991053930> 1k Miembros Offline = 1.20$

<:Discord:1507110676991053930> 1k Miembros Online = 2.00$

🎫 Abrir ticket:
<#1494779889209835580>
                `);
        }

        if (interaction.values[0] === 'followers') {

            embed = new EmbedBuilder()

                .setColor(config.color)

                .setTitle('<:TikTok:1495102970302304357> Followers')

                .setDescription(`
<:TikTok:1495102970302304357> 1000 Followers TikTok = 2.50$

<:ig:1507110723321598043> 1000 Followers Instagram = 1$

🎫 Abrir ticket:
<#1494779889209835580>
                `);
        }

        return interaction.reply({

            embeds: [embed],

            ephemeral: true
        });
    }
}
    if (interaction.isButton()) {
if (interaction.customId === 'make_vouch') {

    const modal = new ModalBuilder()

        .setCustomId('vouch_modal')

        .setTitle('Make A Vouch | Exodial Stock');

    const vouchInput = new TextInputBuilder()

        .setCustomId('vouch_text')

        .setLabel('Escribe tu Vouch')

        .setStyle(TextInputStyle.Paragraph)

        .setPlaceholder('Escribe tu experiencia con Exodial Stock')

        .setRequired(true);

    const starsInput = new TextInputBuilder()

        .setCustomId('vouch_stars')

        .setLabel('Stars (1-5)')

        .setStyle(TextInputStyle.Short)

        .setPlaceholder('5')

        .setRequired(true);

    const row1 = new ActionRowBuilder().addComponents(vouchInput);

    const row2 = new ActionRowBuilder().addComponents(starsInput);

    modal.addComponents(row1, row2);

    return interaction.showModal(modal);
}
        if (
            interaction.customId === 'ticket_compra' ||
            interaction.customId === 'ticket_soporte' ||
            interaction.customId === 'ticket_partner'
        ) {

            let type = '';

            if (interaction.customId === 'ticket_compra') {
                type = 'Compra';
            }

            if (interaction.customId === 'ticket_soporte') {
                type = 'Soporte';
            }

            if (interaction.customId === 'ticket_partner') {
                type = 'Partner';
            }

            const modal = new ModalBuilder()

                .setCustomId(`modal_${type}`)

                .setTitle(`${type} | Exødial`);

            const input1 = new TextInputBuilder()

                .setCustomId('q1')

                .setLabel(
                    type === 'Compra'
                        ? '¿Qué quieres comprar?'
                        : type === 'Soporte'
                        ? '¿Qué necesitas resolver?'
                        : '¿Cuántos miembros tienen?'
                )

                .setStyle(TextInputStyle.Short)

                .setRequired(true);

            const input2 = new TextInputBuilder()

                .setCustomId('q2')

                .setLabel(
                    type === 'Compra'
                        ? '¿Qué método de pago usas?'
                        : type === 'Soporte'
                        ? 'Explica el problema'
                        : '¿De qué trata su servidor?'
                )

                .setStyle(TextInputStyle.Paragraph)

                .setRequired(true);

            const row1 = new ActionRowBuilder().addComponents(input1);

            const row2 = new ActionRowBuilder().addComponents(input2);

            modal.addComponents(row1, row2);

            return interaction.showModal(modal);
        }

        if (interaction.customId === 'close_ticket') {

            if (!isStaff(interaction.member)) {

                return interaction.reply({

                    content: '❌ No tienes permisos.',

                    ephemeral: true
                });
            }

            await interaction.reply('🔒 Cerrando ticket...');

            setTimeout(() => {

                interaction.channel.delete();

            }, 3000);
        }

        if (interaction.customId === 'claim_ticket') {

            if (!isStaff(interaction.member)) {

                return interaction.reply({

                    content: '❌ No tienes permisos.',

                    ephemeral: true
                });
            }

            const embed = new EmbedBuilder()

                .setColor(config.color)

                .setDescription(`✅ Ticket reclamado por ${interaction.user}`);

            return interaction.reply({
                embeds: [embed]
            });
        }

        if (interaction.customId === 'notify_ticket') {

            return interaction.reply({
                content: `<@&${config.staffRole}>`,
                allowedMentions: {
                    roles: [config.staffRole]
                }
            });
        }
    }

    if (interaction.isModalSubmit()) {
if (interaction.customId === 'vouch_modal') {

    const vouch = interaction.fields.getTextInputValue('vouch_text');

    const stars = interaction.fields.getTextInputValue('vouch_stars');

    const reviewChannel = client.channels.cache.get('1495249862965329980');

    const starsDisplay = '⭐'.repeat(Number(stars));

    const embed = new EmbedBuilder()

        .setColor('#5865F2')

        .setTitle('💬 Nuevo Vouch | Exodial Stock')

        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))

        .setDescription(`
> **Estado:** ✅ Aprobado
> **Usuario:** ${interaction.user}
> **Calificación:** ${starsDisplay}

### ✨ Vouch:
\`\`\`
${vouch}
\`\`\`
        `)

        .setFooter({
            text: `Exodial Stock • ${interaction.user.username}`
        })

        .setTimestamp();

    await reviewChannel.send({
        embeds: [embed]
    });

    return interaction.reply({

        content: '✅ Tu vouch fue enviado correctamente.',

        ephemeral: true
    });
}
        const type = interaction.customId.replace('modal_', '');

        const q1 = interaction.fields.getTextInputValue('q1');

        const q2 = interaction.fields.getTextInputValue('q2');

        const channel = await interaction.guild.channels.create({

            name: `${type.toLowerCase()}-${interaction.user.username}`,

            type: ChannelType.GuildText,

            parent: config.ticketsCategory,

            permissionOverwrites: [

                {
                    id: interaction.guild.id,

                    deny: [
                        PermissionsBitField.Flags.ViewChannel
                    ]
                },

                {
                    id: interaction.user.id,

                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages
                    ]
                },

                {
                    id: config.staffRole,

                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages
                    ]
                }
            ]
        });

        ticketCounter++;

        const embed1 = new EmbedBuilder()

            .setColor(config.color)

            .setTitle('Sistema De Tickets')

            .setDescription(`
¡Bienvenido/a! Un miembro del <@&${config.staffRole}> atenderá tu ticket pronto.
            `)

            .addFields(

                {
                    name: '👤 Usuario',
                    value: `${interaction.user}`,
                    inline: false
                },

                {
                    name: '🎟️ Ticket N°',
                    value: `${ticketCounter}`,
                    inline: false
                },

                {
                    name: '🏷️ Categoría',
                    value: `${type}`,
                    inline: false
                }
            )

            .setFooter({
                text: `Ticket abierto por ${interaction.user.username}`
            })

            .setTimestamp();

        const row = new ActionRowBuilder()

            .addComponents(

                new ButtonBuilder()
                    .setCustomId('close_ticket')
                    .setLabel('Cerrar')
                    .setEmoji('🔒')
                    .setStyle(ButtonStyle.Danger),

                new ButtonBuilder()
                    .setCustomId('claim_ticket')
                    .setLabel('Reclamar')
                    .setEmoji('✅')
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId('notify_ticket')
                    .setLabel('Notificar')
                    .setEmoji('📩')
                    .setStyle(ButtonStyle.Primary)
            );

        const embed2 = new EmbedBuilder()

            .setColor(config.color)

            .setTitle('📋 Respuestas del Formulario')

            .addFields(

                {
                    name:
                        type === 'Compra'
                            ? '🛒 Producto'
                            : type === 'Soporte'
                            ? '🎧 Problema'
                            : '👥 Miembros',

                    value: q1,
                    inline: false
                },

                {
                    name:
                        type === 'Compra'
                            ? '💳 Método de pago'
                            : type === 'Soporte'
                            ? '📄 Explicación'
                            : '🌍 Servidor',

                    value: q2,
                    inline: false
                }
            )

            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))

            .setFooter({
                text: `Ticket abierto por ${interaction.user.username}`
            })

            .setTimestamp();

        await channel.send({

            content: `${interaction.user}`,

            embeds: [embed1, embed2],

            components: [row]
        });

        return interaction.reply({

            content: `✅ Ticket creado: ${channel}`,

            ephemeral: true
        });
    }
});

client.login(process.env.TOKEN);
