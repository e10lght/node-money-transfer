const { sequelize } = require('../db/connect')
const { Users } = require('../Models/Users')

const transfer = async (req, res) => {
    // 指定された金額
    const amount = parseInt(req.body.amount); // 数値に変換して代入
    console.log(amount)

    // トランザクションの開始
    const t = await sequelize.transaction()
    try {
        // 0以下の場合はエラーを返す
        if (amount <= 0) {
            throw new Error('0以上の数値で入力してください')
        }
        // NaN(文字列の場合)はエラーを返す
        if (isNaN(amount)) {
            throw new Error('数値で入力してください')
        }
        // 送金元ユーザの決定
        const sendUserEmail = req.body.sendUser;
        const sendUser = await Users.findOne({
            where: { user_email: sendUserEmail }
        },
            { transaction: t })
        if (!sendUser) {
            throw new Error('存在する送金元ユーザを指定してください')
        }

        // 送金元の残高と指定された金額の差額がマイナスでないことを確認
        const differrence = sendUser.balance - amount
        console.log(differrence)
        if (differrence < 0) {
            throw new Error('残高が不足しています')
        }

        // 送信先ユーザの決定
        const receiveUserEmail = req.body.receiveUser
        const receiveUser = await Users.findOne({
            where: { user_email: receiveUserEmail }
        },
            { transaction: t })
        if (!receiveUser) {
            throw new Error('存在する送金先ユーザを指定してください')
        }

        // 送信元と送信先が同じユーザの場合
        if (sendUser.user_id === receiveUser.user_id) {
            throw new Error('同じユーザに送金することはできません')
        }

        // 送信元ユーザの残高から指定額を差し引く
        await sendUser.update({
            balance: differrence
        }, { transaction: t })

        // 送信先ユーザの残高に指定額を加える
        const totalAmount = receiveUser.balance + amount;
        console.log(totalAmount)
        await receiveUser.update({
            balance: totalAmount
        }, { transaction: t })

        // トランザクションの終了
        t.commit()
        console.info('取引が完了しました')
        res.status(200).json({ message: "取引が完了しました" })
    } catch (error) {
        console.error(error.message)
        t.rollback()
        console.error('ロールバックしました')
        res.status(400).json({ message: error.message })
    }
}

module.exports = { transfer }