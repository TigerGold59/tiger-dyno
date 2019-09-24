function processMemberUpdates(object, client, Discord) {
  oldMember = object[0]
  member = object[1]
  if (!oldMember.roles.find('name',"Auto-Updating Name")) {
    return;
  }
  if (!(member.guild.id === "469869605570084886")) {
    return;
  }
  if (oldMember.displayName !== member.displayName) {
    return;
  }
  else {
    var oldRoles = oldMember.roles.array().length
    var nowRoles = member.roles.array().length
    var toAdd = nowRoles - oldRoles
    // Nachito [134/450]
    var name = member.displayName
    number = name.split("[")[1].split("/")[0]
    var realName = name.split("[")[0]
    var shouldBeName = realName + "[" + (Number(number) + toAdd) + "/" + name.split("/")[1]
    try {
      member.setNickname(shouldBeName, "Autoupdate because a role was added.")
    }
    catch (err) {
      console.log("Error changing nickname, either permissions were too low or name was formatted incorrectly.")
    }
  }
}
module.exports = processMemberUpdates
