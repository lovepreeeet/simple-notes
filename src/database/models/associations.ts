import { User } from "./user.model";
import { Task } from "./task.model";

export function applyAssociations() {
    User.hasMany(Task, { foreignKey: "userId" })
    Task.belongsTo(User, { foreignKey: "userId" })
}