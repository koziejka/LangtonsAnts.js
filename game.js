class Ant {
    constructor(x, y, color) {
        this.x = x || Math.floor(Math.random() * maxSize)
        this.y = y || Math.floor(Math.random() * maxSize)
        this.angle = 90
        this.color = color || "#000"
        this.dir = [0, 0]
    }
    move() {
        this.x += this.dir[0]
        this.y += this.dir[1]
        if (this.x < 0) this.x = maxSize - 1
        if (this.y < 0) this.y = maxSize - 1
        if (this.x >= maxSize) this.x = 0
        if (this.y >= maxSize) this.y = 0
        if (black[this.y][this.x] == 1) {
            // czarna w prawo
            this.angle = (this.angle + 90) % 360
            this.dir = rotateVector([0, 1], this.angle)

            c.fillStyle = "#fff"
            c.fillRect(this.x * 10, this.y * 10, 10, 10)
            black[this.y][this.x] = 0
        } else {
            // biała w lewo
            this.angle = (this.angle - 90) % 360
            this.dir = rotateVector([0, 1], this.angle)

            c.fillStyle = this.color
            c.fillRect(this.x * 10, this.y * 10, 10, 10)
            black[this.y][this.x] = 1
        }
    }
}

const maxSize = 400,
    game = document.createElement("canvas"),
    div = document.createElement("div")
document.body.appendChild(div)
div.appendChild(game)
div.id = "game"
game.width = maxSize * 10
game.height = maxSize * 10

game.style.transform = `scale(${(div.offsetWidth - 6) / game.width})`
window.addEventListener("resize", () => {
    clearInterval(interval)
    game.style.transform = `scale(${(div.offsetWidth - 6) / game.width})`
    interval = setInterval(() => {
        for (let ant of ants) {
            for (let i = 0; i < 50; i++) {
                ant.move()
            }
        }
    }, 50)
})


const c = game.getContext("2d"), black = []
for (let i = 0; i < maxSize; i++) {
    black[i] = []
    for (let j = 0; j < maxSize; j++) {
        black[i][j] = 0
    }
}
const rotateVector = (vec, ang) => {
    ang = -ang * (Math.PI / 180)
    var cos = Math.cos(ang), sin = Math.sin(ang)
    return new Array(Math.round(10000 * (vec[0] * cos - vec[1] * sin)) / 10000, Math.round(10000 * (vec[0] * sin + vec[1] * cos)) / 10000)
}
const ants = [new Ant(40, 40, "red")]
for (var i = 0; i < 15; i++) {
    ants.push(new Ant(0, 0, new Color().random().toString()))
}

var interval = setInterval(() => {
    for (let ant of ants) {
        for (let i = 0; i < 50; i++) {
            ant.move()
        }
    }
}, 20)