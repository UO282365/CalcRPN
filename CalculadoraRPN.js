

class CalculadoraRPN {

    constructor() {

        this.pila = new Array();
        this.aux = true;
        this.decimalBool = false;
    }

    iniciar() {
        this.pantalla = document.querySelector('input[name="pantalla"]');
        this.pantallaPila = document.querySelector('textarea');
        this.pantalla.value = 0;
        document.addEventListener('keydown', (event) => {
            this.pulsaTeclado(event);
        });
    }

    pulsaTeclado(evento) {
        if (evento.key >= "0" && evento.key <= "9")
            this.digito(Number(evento.key));
        if (evento.altKey && evento.key == "v")
            this.cambiarSigno();

        if (evento.altKey && evento.key == "o") {
            evento.preventDefault();
            this.on();
        }
        if (evento.altKey && evento.key == "e") {
            evento.preventDefault();
            this.ce();
        }
        if (evento.altKey && evento.key == "r") {
            evento.preventDefault();
            this.calculo("raiz");
        }
        if (evento.altKey && evento.key == "p") {
            evento.preventDefault();
            this.operar("mod");
        }

        if (evento.key == "*")
            this.operar("*");
        if (evento.key == "/")
            this.operar("/");
        if (evento.key == "-")
            this.operar("-");
        if (evento.key == "+")
            this.operar("+");

        if (evento.key == ".")
            this.decimal();
        if (evento.key == "Enter")
            this.enter();

        if (evento.key === "Delete") {//usa el suprimir
            this.del();
        }

        if (evento.key === "p" && evento.altKey) {
            this.calculo("arcsen");
        }
        if (evento.key === "l" && evento.altKey) {
            this.calculo("arctan");
        }
        if (evento.key === "i" && evento.altKey) {
            this.calculo("arccos");
        }


        if (evento.key === "U" && evento.shiftKey) {
            this.calculo("cuadrado");
        }
        if (evento.key === "Y" && evento.shiftKey) {
            this.operar("elevado");
        }
        if (evento.key === "s" && evento.altKey) {
            this.calculo("sen");
        }
        if (evento.key === "t" && evento.altKey) {
            this.calculo("tan");
        }
        if (evento.key === "c" && evento.altKey) {
            this.calculo("cos");
        }
        if (evento.key === "d" && evento.altKey) {
            this.calculo("potenciaDiez");
        }
        if (evento.key === "l" && evento.altKey) {
            this.calculo("log");
        }
        if (evento.key === "x" && evento.altKey) {
            this.calculo("exp");
        }

        if (evento.key === "a" && evento.altKey) {
            this.digito(Number(Math.PI));
        }
        if (evento.key === "!") {
            this.calculo("fact");
        }


    }

    del() {
        this.pantalla.value = this.pantalla.value.slice(0, -1);
        if (this.pantalla.value.length == 0) {
            this.pantalla.value = "0"
            this.aux = true;
        }
    }

    on() {
        this.pila = new Array();
        this.aux = true;
        this.decimalBool = false;
        this.pantalla.value = 0;
        this.mostrar();
    }

    ce() {
        this.pantalla.value = 0;
        this.aux = true;
        this.mostrar();
    }

    digito(n) {
        if (this.aux == true) {
            this.pantalla.value = "";
            this.aux = false
            this.decimalBool = true;
        }
        var str = this.pantalla.value + n;
        this.pantalla.value = str;
    }

    enter() {
        var str = this.pantalla.value;
        this.pila.push(str);
        this.mostrar();
        this.pantalla.value = 0;
        this.aux = true;
        this.decimalBool = true;
    }
    decimal() {
        if (this.decimalBool == true) {
            if (this.aux) {
                var str = "0.";
                this.aux = false;
            }
            else {
                var str = this.pantalla.value + ".";
            }
            this.pantalla.value = str;
            this.decimalBool = false;
        }
    }

    operar(signo) {
        if (this.pila.length >= 2) {
            var b = parseFloat(this.pila.pop());
            var a = parseFloat(this.pila.pop());
            if (!isNaN(b) && !isNaN(a)) {
                switch (signo) {
                    case ("+"):
                        this.pila.push(Number(a + b));
                        break;
                    case ("-"):
                        this.pila.push(Number(a - b));
                        break;
                    case ("*"):
                        this.pila.push(Number(a * b));
                        break;
                    case ("/"):
                        this.pila.push(Number(a / b));
                        break;
                    case ("mod"):
                        this.pila.push(Number(a % b));
                        break;
                    case ("elevado"):
                        this.pila.push(Number(a ** b));
                        break;

                }
            }
        }
        this.mostrar();
    }

    calculo(opera) {
        if (this.pila.length >= 1) {

            var a = parseFloat(this.pila.pop());
            if (!isNaN(a)) {
                switch (opera) {
                    case ("sen"):
                        this.pila.push(Number(Math.sin(a)));
                        break;
                    case ("cos"):
                        this.pila.push(Number(Math.cos(a)));
                        break;
                    case ("tan"):
                        this.pila.push(Number(Math.tan(a)));
                        break;
                    case ("arcsen"):
                        this.pila.push(Number(Math.asin(a)));
                        break;
                    case ("arccos"):
                        this.pila.push(Number(Math.acos(a)));
                        break;
                    case ("arctan"):
                        this.pila.push(Number(Math.atan(a)));
                        break;
                    case ("cuadrado"):
                        this.pila.push(Number(a * a));
                        break;
                    case ("raiz"):
                        this.pila.push(Number(Math.sqrt(a)));
                        break;
                    case ("potenciaDiez"):
                        this.pila.push(Number(10 ** a));
                        break;
                    case ("log"):
                        this.pila.push(Number(Math.log(a)));
                        break;
                    case ("exp"):
                        this.pila.push(Number(Math.exp(a)));
                        break;
                    case ("fact"):
                        this.pila.push(Number(this.factorial(a)));
                        break;
                }
            }
        }
        this.mostrar();
    }

    factorial(num) {
        var c = 1;
        for (var i = 1; i <= num; i++) {
            c = c * i;
        }
        return c;
    }

    mostrar() {
        this.pantallaPila.value = "";//boramos la pantalla de la pila
        for (var i in this.pila) {
            this.pantallaPila.value += this.pila[i] + "\n";//añadimos los elementos en la pila
        }
    }

    c() {
        this.pila = new Array();
        this.mostrar();
        this.pantalla = "0";
        this.aux = false;
    }
	cambiarSigno() {
        var str = this.pantalla.value * -1;
        this.pantalla.value = str;
    }
}

var calculadora = new CalculadoraRPN();