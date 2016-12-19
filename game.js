class Ant {
    constructor(x, y, color) {
        this.x = x || Math.floor(Math.random() * 20)
        this.y = y || Math.floor(Math.random() * 20)
        this.angle = 90
        this.color = color || "#000"
        this.dir = [0, 0]
    }
    move() {
        // console.log(this.x, this.y, this.dir[0])
        let index
        this.x += this.dir[0]
        this.y += this.dir[1]
        if (black.some((x, i) => {
            if (x[0] == this.x && x[1] == this.y) {
                index = i
                return true
            }
            return false
        })) {
            // czarna w prawo
            this.angle = (this.angle + 90) % 360
            this.dir = rotateVector([0, 1], this.angle)

            c.fillStyle = "#fff"
            c.fillRect(this.x * 10, this.y * 10, 10, 10)
            black.splice(index, 1)
        } else {
            // biała w lewo 
            this.angle = (this.angle - 90) % 360
            this.dir = rotateVector([0, 1], this.angle)

            c.fillStyle = this.color
            c.fillRect(this.x * 10, this.y * 10, 10, 10)
            black.push([this.x, this.y])
        }
    }
}

const maxSize = 80
const game = document.createElement("canvas")
document.body.appendChild(game)
game.width = maxSize * 10
game.height = maxSize * 10
game.style.border = "solid"
const c = game.getContext("2d"), black = []
const rotateVector = (vec, ang) => {
    ang = -ang * (Math.PI / 180)
    var cos = Math.cos(ang)
    var sin = Math.sin(ang)
    return new Array(Math.round(10000 * (vec[0] * cos - vec[1] * sin)) / 10000, Math.round(10000 * (vec[0] * sin + vec[1] * cos)) / 10000)
}
const ants = [new Ant(40, 40, "red"), new Ant(40, 20, "blue")]
for (var i = 0; i < 10; i++) {
    ants.push(
        new Ant(Math.floor(Math.random() * 20),
         Math.floor(Math.random() * 20)),
         new Color().random().toString()
         )
}
setInterval(() => {
    for (let ant of ants) {
        ant.move()
    }
}, 1)