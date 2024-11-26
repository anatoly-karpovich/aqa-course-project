const emptyCustomer = {
  _id: "",
  email: "",
  name: "",
  country: "",
  city: "",
  street: "",
  house: "",
  flat: "",
  phone: "",
  createdOn: "",
  notes: "",
};

const emptyProduct = {
  _id: "",
  name: "",
  amount: "",
  price: "",
  manufacturer: "",
  createdOn: "",
  notes: "",
};

const defaultMetrics = {
  orders: {
    totalRevenue: 651163,
    totalOrders: 85,
    averageOrderValue: 7661,
    totalCanceledOrders: 8,
    recentOrders: [
      {
        _id: "671a4cd961293dd4fb86ac5c",
        status: "Received",
        customer: {
          _id: "67029a5af5b4ca3d51e20a0b",
          email: "Diego9@yahoo.com",
          name: "Name xFerNmhyYjPNsLdceaKhKjsVxdWKNzCWcYl",
          country: "Great Britain",
          city: "City NUlGJBWlRmCasLo",
          street: "Street 4TRVU4f3guGOZQNysLZ0Ntu8GL0yRfooa",
          house: 867,
          flat: 7340,
          phone: "+649527439847",
          createdOn: "2024-10-06T14:10:00.000Z",
          notes:
            "Notes AVMUbACIVTyUbmlCRmpqLnugBkBugOdJiTbRJqgvvYvgCGHsbBqbMZNGDDzWzcCJhsnyvtvnISMBzsXfFKNetsStgLqhieHMuYGithZZigodaqdIHlYdgTeMTXJTYFqiRxETEDiEsZdVKPOfYTSlnFdgQeRgFmOMMCEcWlhkLXaEROtcbxGsslHeBJMjZFyATdrLOLmxKcGIMnNpSVxhwkMXgiVbNpyjneksUAjBWictnFbjjGel",
        },
        products: [
          {
            _id: "67155921bb29528358d1d82d",
            name: "Chair56813",
            amount: 2,
            price: 100,
            manufacturer: "Google",
            notes: "Test notes",
            received: true,
          },
          {
            _id: "671406c757aa60665d7b95c4",
            name: "Chicken6220",
            amount: 626,
            price: 46449,
            manufacturer: "Amazon",
            notes:
              "QKpHSoyLbEdUGlDQeyiwVcfrKbyfDrtYOOMyHgoRPdXbwxyFRrOLOtfaFvcdeWXreOZNaBgXlhzlBCUjNtyTwTufzCjSfMHhphUUDYKAJlVUlNLNVMLdrOiLtlCUcolTgJIIFCWJiydKSHSVUBWWUZluoWHsPdPOdHXNPESbxwIaAOekEpoytKKJoDvuIsTjgHgLTudtUZNsnGqkn",
            received: true,
          },
          {
            _id: "67155921bb29528358d1d82d",
            name: "Chair56813",
            amount: 2,
            price: 100,
            manufacturer: "Google",
            notes: "Test notes",
            received: true,
          },
          {
            _id: "66eb9757fd0a2ec681e70fa9",
            name: "Chair80339",
            amount: 2,
            price: 100,
            manufacturer: "Sony",
            notes: "Test notes",
            received: true,
          },
          {
            _id: "6718b55f61293dd4fb867dba",
            name: "8958741",
            amount: 1,
            price: 55,
            manufacturer: "Samsung",
            notes: "Толя - жопа",
            received: true,
          },
        ],
        delivery: {
          address: {
            country: "Ukraine",
            city: "City NUlGJBWlRmCasLo",
            street: "Street 4TRVU4f3guGOZQNysLZ0Ntu8GL0yRfooa",
            house: 867,
            flat: 7340,
          },
          finalDate: "2024-10-29T00:00:00.000Z",
          condition: "Delivery",
        },
        total_price: 46804,
        createdOn: "2024-10-24T13:34:00.000Z",
        comments: [
          {
            text: "ваы",
            createdOn: "2024-10-24T13:35:00.000Z",
            _id: "671a4d1b61293dd4fb86ad15",
          },
          {
            text: "ывфвф",
            createdOn: "2024-10-24T13:35:00.000Z",
            _id: "671a4d2261293dd4fb86ad27",
          },
        ],
        history: [
          {
            status: "Received",
            customer: "67029a5af5b4ca3d51e20a0b",
            products: [
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: true,
              },
              {
                _id: "671406c757aa60665d7b95c4",
                name: "Chicken6220",
                amount: 626,
                price: 46449,
                manufacturer: "Amazon",
                notes:
                  "QKpHSoyLbEdUGlDQeyiwVcfrKbyfDrtYOOMyHgoRPdXbwxyFRrOLOtfaFvcdeWXreOZNaBgXlhzlBCUjNtyTwTufzCjSfMHhphUUDYKAJlVUlNLNVMLdrOiLtlCUcolTgJIIFCWJiydKSHSVUBWWUZluoWHsPdPOdHXNPESbxwIaAOekEpoytKKJoDvuIsTjgHgLTudtUZNsnGqkn",
                received: true,
              },
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: true,
              },
              {
                _id: "66eb9757fd0a2ec681e70fa9",
                name: "Chair80339",
                amount: 2,
                price: 100,
                manufacturer: "Sony",
                notes: "Test notes",
                received: true,
              },
              {
                _id: "6718b55f61293dd4fb867dba",
                name: "8958741",
                amount: 1,
                price: 55,
                manufacturer: "Samsung",
                notes: "Толя - жопа",
                received: true,
              },
            ],
            total_price: 46804,
            delivery: {
              address: {
                country: "Ukraine",
                city: "City NUlGJBWlRmCasLo",
                street: "Street 4TRVU4f3guGOZQNysLZ0Ntu8GL0yRfooa",
                house: 867,
                flat: 7340,
              },
              finalDate: "2024-10-29T00:00:00.000Z",
              condition: "Delivery",
            },
            changedOn: "2024-10-24T13:35:00.000Z",
            action: "All products received",
          },
          {
            status: "Partially Received",
            customer: "67029a5af5b4ca3d51e20a0b",
            products: [
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: true,
              },
              {
                _id: "671406c757aa60665d7b95c4",
                name: "Chicken6220",
                amount: 626,
                price: 46449,
                manufacturer: "Amazon",
                notes:
                  "QKpHSoyLbEdUGlDQeyiwVcfrKbyfDrtYOOMyHgoRPdXbwxyFRrOLOtfaFvcdeWXreOZNaBgXlhzlBCUjNtyTwTufzCjSfMHhphUUDYKAJlVUlNLNVMLdrOiLtlCUcolTgJIIFCWJiydKSHSVUBWWUZluoWHsPdPOdHXNPESbxwIaAOekEpoytKKJoDvuIsTjgHgLTudtUZNsnGqkn",
                received: true,
              },
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "66eb9757fd0a2ec681e70fa9",
                name: "Chair80339",
                amount: 2,
                price: 100,
                manufacturer: "Sony",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "6718b55f61293dd4fb867dba",
                name: "8958741",
                amount: 1,
                price: 55,
                manufacturer: "Samsung",
                notes: "Толя - жопа",
                received: false,
              },
            ],
            total_price: 46804,
            delivery: {
              address: {
                country: "Ukraine",
                city: "City NUlGJBWlRmCasLo",
                street: "Street 4TRVU4f3guGOZQNysLZ0Ntu8GL0yRfooa",
                house: 867,
                flat: 7340,
              },
              finalDate: "2024-10-29T00:00:00.000Z",
              condition: "Delivery",
            },
            changedOn: "2024-10-24T13:34:00.000Z",
            action: "Received",
          },
          {
            status: "In Process",
            customer: "67029a5af5b4ca3d51e20a0b",
            products: [
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "671406c757aa60665d7b95c4",
                name: "Chicken6220",
                amount: 626,
                price: 46449,
                manufacturer: "Amazon",
                notes:
                  "QKpHSoyLbEdUGlDQeyiwVcfrKbyfDrtYOOMyHgoRPdXbwxyFRrOLOtfaFvcdeWXreOZNaBgXlhzlBCUjNtyTwTufzCjSfMHhphUUDYKAJlVUlNLNVMLdrOiLtlCUcolTgJIIFCWJiydKSHSVUBWWUZluoWHsPdPOdHXNPESbxwIaAOekEpoytKKJoDvuIsTjgHgLTudtUZNsnGqkn",
                received: false,
              },
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "66eb9757fd0a2ec681e70fa9",
                name: "Chair80339",
                amount: 2,
                price: 100,
                manufacturer: "Sony",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "6718b55f61293dd4fb867dba",
                name: "8958741",
                amount: 1,
                price: 55,
                manufacturer: "Samsung",
                notes: "Толя - жопа",
                received: false,
              },
            ],
            total_price: 46804,
            delivery: {
              address: {
                country: "Ukraine",
                city: "City NUlGJBWlRmCasLo",
                street: "Street 4TRVU4f3guGOZQNysLZ0Ntu8GL0yRfooa",
                house: 867,
                flat: 7340,
              },
              finalDate: "2024-10-29T00:00:00.000Z",
              condition: "Delivery",
            },
            changedOn: "2024-10-24T13:34:00.000Z",
            action: "Order processing started",
          },
          {
            status: "Draft",
            customer: "67029a5af5b4ca3d51e20a0b",
            products: [
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "671406c757aa60665d7b95c4",
                name: "Chicken6220",
                amount: 626,
                price: 46449,
                manufacturer: "Amazon",
                notes:
                  "QKpHSoyLbEdUGlDQeyiwVcfrKbyfDrtYOOMyHgoRPdXbwxyFRrOLOtfaFvcdeWXreOZNaBgXlhzlBCUjNtyTwTufzCjSfMHhphUUDYKAJlVUlNLNVMLdrOiLtlCUcolTgJIIFCWJiydKSHSVUBWWUZluoWHsPdPOdHXNPESbxwIaAOekEpoytKKJoDvuIsTjgHgLTudtUZNsnGqkn",
                received: false,
              },
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "66eb9757fd0a2ec681e70fa9",
                name: "Chair80339",
                amount: 2,
                price: 100,
                manufacturer: "Sony",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "6718b55f61293dd4fb867dba",
                name: "8958741",
                amount: 1,
                price: 55,
                manufacturer: "Samsung",
                notes: "Толя - жопа",
                received: false,
              },
            ],
            total_price: 46804,
            delivery: {
              address: {
                country: "Ukraine",
                city: "City NUlGJBWlRmCasLo",
                street: "Street 4TRVU4f3guGOZQNysLZ0Ntu8GL0yRfooa",
                house: 867,
                flat: 7340,
              },
              finalDate: "2024-10-29T00:00:00.000Z",
              condition: "Delivery",
            },
            changedOn: "2024-10-24T13:34:00.000Z",
            action: "Delivery Scheduled",
          },
          {
            status: "Draft",
            customer: "67029a5af5b4ca3d51e20a0b",
            products: [
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "671406c757aa60665d7b95c4",
                name: "Chicken6220",
                amount: 626,
                price: 46449,
                manufacturer: "Amazon",
                notes:
                  "QKpHSoyLbEdUGlDQeyiwVcfrKbyfDrtYOOMyHgoRPdXbwxyFRrOLOtfaFvcdeWXreOZNaBgXlhzlBCUjNtyTwTufzCjSfMHhphUUDYKAJlVUlNLNVMLdrOiLtlCUcolTgJIIFCWJiydKSHSVUBWWUZluoWHsPdPOdHXNPESbxwIaAOekEpoytKKJoDvuIsTjgHgLTudtUZNsnGqkn",
                received: false,
              },
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "66eb9757fd0a2ec681e70fa9",
                name: "Chair80339",
                amount: 2,
                price: 100,
                manufacturer: "Sony",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "6718b55f61293dd4fb867dba",
                name: "8958741",
                amount: 1,
                price: 55,
                manufacturer: "Samsung",
                notes: "Толя - жопа",
                received: false,
              },
            ],
            total_price: 46804,
            delivery: null,
            changedOn: "2024-10-24T13:34:00.000Z",
            action: "Customer changed",
          },
          {
            status: "Draft",
            customer: "6719a19261293dd4fb86a8f6",
            products: [
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "671406c757aa60665d7b95c4",
                name: "Chicken6220",
                amount: 626,
                price: 46449,
                manufacturer: "Amazon",
                notes:
                  "QKpHSoyLbEdUGlDQeyiwVcfrKbyfDrtYOOMyHgoRPdXbwxyFRrOLOtfaFvcdeWXreOZNaBgXlhzlBCUjNtyTwTufzCjSfMHhphUUDYKAJlVUlNLNVMLdrOiLtlCUcolTgJIIFCWJiydKSHSVUBWWUZluoWHsPdPOdHXNPESbxwIaAOekEpoytKKJoDvuIsTjgHgLTudtUZNsnGqkn",
                received: false,
              },
              {
                _id: "67155921bb29528358d1d82d",
                name: "Chair56813",
                amount: 2,
                price: 100,
                manufacturer: "Google",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "66eb9757fd0a2ec681e70fa9",
                name: "Chair80339",
                amount: 2,
                price: 100,
                manufacturer: "Sony",
                notes: "Test notes",
                received: false,
              },
              {
                _id: "6718b55f61293dd4fb867dba",
                name: "8958741",
                amount: 1,
                price: 55,
                manufacturer: "Samsung",
                notes: "Толя - жопа",
                received: false,
              },
            ],
            total_price: 46804,
            delivery: null,
            changedOn: "2024-10-24T13:34:00.000Z",
            action: "Order created",
          },
        ],
      },
      {
        _id: "6718d48f61293dd4fb868778",
        status: "Draft",
        customer: {
          _id: "66fc67daf5b4ca3d51e1f591",
          email: "Osbaldo_Gulgowski@yahoo.com",
          name: "Floyd Thiel",
          country: "Germany",
          city: "Maricopa",
          street: "Conroy Radial",
          house: 206,
          flat: 6076,
          phone: "+340018385593",
          createdOn: "2024-10-01T21:21:00.000Z",
          notes:
            "Notes sQpUDsZWHfaykKYQDTcaJmeqcNCnlIWsMRhAJQRFRtKSJhRiSvUAZShzTIXcdzfNJgMeyDbSBWIaRBklNhBlZbbePYWnkxHrvuopZtSzyeGDbUMVDqMWUGOywtELduYJcHRCyjmheQViIZkNJqwTupuGHvuYICgwNIMyPBQErxyuBwHmtqCJFkrjvkJUUCXNsaihXWWXBgDEtYhCPKklISJtqPVWdGopaTvjMJcJctZSiMbNuMrA",
        },
        products: [
          {
            _id: "6706ca4d57aa60665d7b6a62",
            name: "Chair29271",
            amount: 2,
            price: 100,
            manufacturer: "Tesla",
            notes: "Test notes",
            received: false,
          },
        ],
        delivery: {
          address: {
            country: "Germany",
            city: "Maricopa",
            street: "Conroy Radial",
            house: 206,
            flat: 6076,
          },
          finalDate: "2024-10-30T00:00:00.000Z",
          condition: "Delivery",
        },
        total_price: 100,
        createdOn: "2024-10-23T10:48:00.000Z",
        comments: [],
        history: [
          {
            status: "Draft",
            customer: "66fc67daf5b4ca3d51e1f591",
            products: [
              {
                _id: "6706ca4d57aa60665d7b6a62",
                name: "Chair29271",
                amount: 2,
                price: 100,
                manufacturer: "Tesla",
                notes: "Test notes",
                received: false,
              },
            ],
            total_price: 100,
            delivery: {
              address: {
                country: "Germany",
                city: "Maricopa",
                street: "Conroy Radial",
                house: 206,
                flat: 6076,
              },
              finalDate: "2024-10-30T00:00:00.000Z",
              condition: "Delivery",
            },
            changedOn: "2024-10-27T12:31:00.000Z",
            action: "Delivery Scheduled",
          },
          {
            status: "Draft",
            customer: "66fc67daf5b4ca3d51e1f591",
            products: [
              {
                _id: "6706ca4d57aa60665d7b6a62",
                name: "Chair29271",
                amount: 2,
                price: 100,
                manufacturer: "Tesla",
                notes: "Test notes",
                received: false,
              },
            ],
            total_price: 100,
            delivery: null,
            changedOn: "2024-10-23T10:48:00.000Z",
            action: "Order created",
          },
        ],
      },
      {
        _id: "6718d46b61293dd4fb8686a4",
        status: "In Process",
        customer: {
          _id: "6706c56c57aa60665d7b6875",
          email: "Chadd65@hotmail.com",
          name: "Estelle Lebsack",
          country: "France",
          city: "Port Eddie",
          street: "Franklin Avenue",
          house: 994,
          flat: 8430,
          phone: "+141007110775",
          createdOn: "2024-10-09T18:03:00.000Z",
          notes:
            "Notes SDHYsYSjcANJrGZVkCnlwmZQuMRnDAjlPwAPQmKmwvULxPMGDvUqGlHpDevLXKgZxppCYMUqzphxwpnkmAuGgVaEfBhKzPbeuzUDPoFRZYAnvaVniHcnbtkHBIceqGEFvKzAACCzOKleMFUroRnHEaxaeLfGuCJvpWVREYaDuVltSGjiZZFTEibBxvzTgDaYwpEzjLWcOijQqIzwVmjLNYDHrpKqJlWxicEXmNINdfxMDYMRkqmt",
        },
        products: [
          {
            _id: "671558edbb29528358d1d772",
            name: "Chicken70456",
            amount: 56,
            price: 72218,
            manufacturer: "Samsung",
            notes: "bnFSPISLDgojpwqGLwrMIqyPwotBRhjKFTZxETuC",
            received: false,
          },
        ],
        delivery: {
          address: {
            country: "France",
            city: "Port Eddie",
            street: "Franklin Avenue",
            house: 994,
            flat: 8430,
          },
          finalDate: "2024-10-31T00:00:00.000Z",
          condition: "Delivery",
        },
        total_price: 72218,
        createdOn: "2024-10-23T10:48:00.000Z",
        comments: [],
        history: [
          {
            status: "In Process",
            customer: "6706c56c57aa60665d7b6875",
            products: [
              {
                _id: "671558edbb29528358d1d772",
                name: "Chicken70456",
                amount: 56,
                price: 72218,
                manufacturer: "Samsung",
                notes: "bnFSPISLDgojpwqGLwrMIqyPwotBRhjKFTZxETuC",
                received: false,
              },
            ],
            total_price: 72218,
            delivery: {
              address: {
                country: "France",
                city: "Port Eddie",
                street: "Franklin Avenue",
                house: 994,
                flat: 8430,
              },
              finalDate: "2024-10-31T00:00:00.000Z",
              condition: "Delivery",
            },
            changedOn: "2024-10-27T19:59:00.000Z",
            action: "Order processing started",
          },
          {
            status: "Draft",
            customer: "6706c56c57aa60665d7b6875",
            products: [
              {
                _id: "671558edbb29528358d1d772",
                name: "Chicken70456",
                amount: 56,
                price: 72218,
                manufacturer: "Samsung",
                notes: "bnFSPISLDgojpwqGLwrMIqyPwotBRhjKFTZxETuC",
                received: false,
              },
            ],
            total_price: 72218,
            delivery: {
              address: {
                country: "France",
                city: "Port Eddie",
                street: "Franklin Avenue",
                house: 994,
                flat: 8430,
              },
              finalDate: "2024-10-31T00:00:00.000Z",
              condition: "Delivery",
            },
            changedOn: "2024-10-27T19:58:00.000Z",
            action: "Delivery Scheduled",
          },
          {
            status: "Draft",
            customer: "6706c56c57aa60665d7b6875",
            products: [
              {
                _id: "671558edbb29528358d1d772",
                name: "Chicken70456",
                amount: 56,
                price: 72218,
                manufacturer: "Samsung",
                notes: "bnFSPISLDgojpwqGLwrMIqyPwotBRhjKFTZxETuC",
                received: false,
              },
            ],
            total_price: 72218,
            delivery: null,
            changedOn: "2024-10-23T10:48:00.000Z",
            action: "Order created",
          },
        ],
      },
    ],
    ordersCountPerDay: [
      {
        date: {
          day: 7,
          month: 10,
          year: 2024,
        },
        count: 2,
      },
      {
        date: {
          day: 8,
          month: 10,
          year: 2024,
        },
        count: 2,
      },
      {
        date: {
          day: 9,
          month: 10,
          year: 2024,
        },
        count: 1,
      },
      {
        date: {
          day: 20,
          month: 10,
          year: 2024,
        },
        count: 5,
      },
      {
        date: {
          day: 21,
          month: 10,
          year: 2024,
        },
        count: 3,
      },
      {
        date: {
          day: 23,
          month: 10,
          year: 2024,
        },
        count: 4,
      },
      {
        date: {
          day: 24,
          month: 10,
          year: 2024,
        },
        count: 1,
      },
    ],
  },
  customers: {
    totalNewCustomers: 438,
    topCustomers: [
      {
        _id: "6706c56c57aa60665d7b6875",
        totalSpent: 250777,
        ordersCount: 10,
        customerName: "Estelle Lebsack",
        customerEmail: "Chadd65@hotmail.com",
      },
      {
        _id: "66d07721fd0a2ec681e67f81",
        totalSpent: 200001,
        ordersCount: 1,
        customerName: "Name iRcRVDtztPlaQKrWLCGNkpWOkcvthApygll",
        customerEmail: "Tara.Marvin@yahoo.com",
      },
      {
        _id: "66cbd2c8fd0a2ec681e67ba0",
        totalSpent: 110198,
        ordersCount: 1,
        customerName: "Name PbaOieMIqEMAiaXGlnpEZEsSSroCwlEgxot",
        customerEmail: "Jaycee_Kuhic73@yahoo.com",
      },
    ],
    customerGrowth: [
      {
        date: {
          year: 2024,
          month: 10,
          day: 14,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 15,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 16,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 17,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 18,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 19,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 20,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 21,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 22,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 23,
        },
        count: 0,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 24,
        },
        count: 3,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 25,
        },
        count: 1,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 26,
        },
        count: 3,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 27,
        },
        count: 1,
      },
      {
        date: {
          year: 2024,
          month: 10,
          day: 28,
        },
        count: 0,
      },
    ],
  },
  products: {
    topProducts: [
      {
        name: "Cheese59565",
        sales: 11,
      },
      {
        name: "Hat17710",
        sales: 9,
      },
      {
        name: "Chair80339",
        sales: 6,
      },
      {
        name: "Fish21593",
        sales: 5,
      },
      {
        name: "Pants32892",
        sales: 5,
      },
    ],
  },
};

const emptyOrder = {
  _id: "-",
  status: "Draft",
  customer: {
    _id: "-",
    email: "-",
    name: "-",
    country: "-",
    city: "-",
    street: "-",
    house: "-",
    flat: "-",
    phone: "-",
    createdOn: "2024-11-22T01:27:00.000Z",
    notes: "-",
  },
  products: [
    {
      _id: "-",
      name: "-",
      amount: "-",
      price: "-",
      manufacturer: "-",
      notes: "-",
      received: false,
    },
  ],
  delivery: null,
  total_price: 0,
  createdOn: "2024-11-24T01:15:00.000Z",
  comments: [],
  history: [
    {
      status: "Draft",
      customer: "-",
      products: [
        {
          _id: "-",
          name: "-",
          amount: "-",
          price: "-",
          manufacturer: "-",
          notes: "-",
          received: false,
        },
      ],
      total_price: 0,
      delivery: null,
      changedOn: "2024-11-24T01:15:00.000Z",
      action: "Order created",
    },
  ],
};
