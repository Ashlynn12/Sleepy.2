const Command = require("../../Structures/Command");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'staff',
            category: "Owner",
            ownerOnly: true

        });
    }

    async run(message) {
        const msg = message
        message.channel.send([
            `♡﹒:croissant:﹗Hello! Welcome to 'Pan Cafe' this cafe means Bread cafe! Please do the following below to enter this small but cute server! 

            Please keep in mind that if you're muted, it's only cause someone else is verifying so please wait!!
            
            Also, if we don't answer it's cause we are sleeping and or busy! So please be patient!!
            
            :honey_pot:﹒﹒Please type '//verify'
            
            Without the → '
            
            And answer the following questions we have below ‹3`
        ])

        msg.delete()
    }
};