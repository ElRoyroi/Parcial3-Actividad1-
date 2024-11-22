$(document).ready(function() {
    $('#productos').DataTable({
        data: obtenerProductos(),
        columns: [
            { data: 'imagen', render: function(data) {
                return `<img src="${data}" alt="Producto" style="width: 100px;">`;
            }},
            { data: 'nombre' },
            { data: 'categoria' },
            { data: 'precio', render: $.fn.dataTable.render.number(',', '.', 0, '$') },
            { data: 'stock' },
            { data: null, render: function() {
                return `
                    <button class="edit-btn"><i class="bi bi-pencil"></i></button>
                    <button class="delete-btn"><i class="bi bi-trash"></i></button>
                `;
            }}
        ]
    });
});

function obtenerProductos() {
    return [
        {
            imagen: "img/laptops/Laptop1.png",
            nombre: "Apple MacBook Air (13 pulgadas, 2020, Chip M1)",
            categoria: "Computadoras",
            precio: 12000,
            stock: 201
        },
        {
            imagen: "img/laptops/Laptop2.png",
            nombre: "Laptop Dell Inspiron 350 15.6 Core i5 10th Gen",
            categoria: "Computadoras",
            precio: 8000,
            stock: 92
        },
        {
            imagen: "img/laptops/Laptop3.png",
            nombre: "Laptop Hp 245 G9 Ryzen 3 3250u 8gb M.2 512gb",
            categoria: "Computadoras",
            precio: 4000,
            stock: 283
        },
        {
            imagen: "img/laptops/Laptop4.png",
            nombre: "Chuwi GemiBook Plus plateada 15.6",
            categoria: "Computadoras",
            precio: 5500,
            stock: 356
        },
        {
            imagen: "img/laptops/Laptop5.png",
            nombre: "Laptop MSI Gamer Thin Gf63 15.6'' 16GB de Ram 512GB",
            categoria: "Computadoras",
            precio: 8000,
            stock: 109
        },
        {
            imagen: "img/laptops/Laptop6.png",
            nombre: "Lenovo ThinkPad X1 Carbon Gen 9",
            categoria: "Computadoras",
            precio: 15000,
            stock: 75
        },
        {
            imagen: "img/laptops/Laptop7.png",
            nombre: "Acer Aspire 5 Slim A515-45-R74Z",
            categoria: "Computadoras",
            precio: 6000,
            stock: 150
        },
        {
            imagen: "img/laptops/Laptop8.png",
            nombre: "Asus ZenBook 13 Ultra-Slim Laptop",
            categoria: "Computadoras",
            precio: 13000,
            stock: 85
        }
    ];
    
}

