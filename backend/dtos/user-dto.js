class UserDto {
    id;
    phone;
    activated;
    createdAt;
    avatar;
    name;

    constructor(user) {
        this.id = user._id;
        this.phone = user.phone;
        this.name = user.name;
        this.avatar = user.avatar ;
        this.activated = user.activated;
        this.createdAt = user.createdAt;
    }
}

module.exports = UserDto