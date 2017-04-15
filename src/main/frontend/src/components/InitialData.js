// this data is used when not connected to server

export default {

    users: [
        {
            id: 0,
            login: "user1",
            password: "pass1",
            role: "admin1"
        },
        {
            id: 1,
            login: "user2",
            password: "pass2",
            role: "admin2"
        }
    ],

    customers: [
        {
            id: 0,
            customerName: "Заказчик1",
            cellNumber: "+1111111111",
            city: "Днепр",
            newPostOfficeNumber: "111",
            balance: 0,
            additionalInfo: "Инфо1",
            orders: []
        },
        {
            id: 1,
            customerName: "Заказчик2",
            cellNumber: "+2222222222",
            city: "Киев",
            newPostOfficeNumber: "222",
            balance: 1000,
            additionalInfo: "Инфо2",
            orders: [0, 1]
        },
        {
            id: 2,
            customerName: "Заказчик3",
            cellNumber: "+33333333333333",
            city: "Одесса",
            newPostOfficeNumber: "333",
            balance: 333,
            additionalInfo: "Инфо3",
            orders: [2]
        }
    ],

    orders: [
        {
            id: 0,
            customerId: 1,
            startDate: "01.01.2017",
            status: "received",
            orderPoints: [0]
        },
        {
            id: 1,
            customerId: 1,
            startDate: "02.01.2017",
            status: "checked",
            orderPoints: [1]
        },
        {
            id: 2,
            customerId: 2,
            startDate: "03.01.2017",
            status: "inProcess",
            orderPoints: [2]
        },
    ],

    orderPoints: [
        {
            id: 0,
            orderId: 0,
            serviceType: "cellPhoneRepair",
            deviceModel: "iPhone 6",
            price: 100,
            pointStatus: "received",
            comment: "",
            gotCash: 100,
            gotCard: 0,
            rate: 30,
            repairman: "A",
            info: "info0",
            startDate: "01.01.2017",
            checkedDate: "",
            inOperationDate: "",
            readyDate: "",
            shippedDate: "",
            closedDate: ""
        },
        {
            id: 1,
            orderId: 1,
            serviceType: "LCD repair",
            deviceModel: "iPhone 5",
            price: 80,
            pointStatus: "received",
            comment: "",
            gotCash: 0,
            gotCard: 0,
            rate: 25,
            repairman: "B",
            info: "info1",
            startDate: "02.01.2017",
            checkedDate: "",
            inOperationDate: "",
            readyDate: "",
            shippedDate: "",
            closedDate: ""
        },
        {
            id: 2,
            orderId: 2,
            serviceType: "LCD repair",
            deviceModel: "iPhone 6s",
            price: 350,
            pointStatus: "received",
            comment: "",
            gotCash: 0,
            gotCard: 0,
            rate: 100,
            repairman: "C",
            info: "info2",
            startDate: "03.01.2017",
            checkedDate: "",
            inOperationDate: "",
            readyDate: "",
            shippedDate: "",
            closedDate: ""
        }
    ]

};

