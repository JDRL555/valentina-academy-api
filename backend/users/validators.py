def is_admin(user):
    return user.groups.filter(name="admin").exists()
  
def is_teacher(user):
    return user.groups.filter(name="teacher").exists()

def is_student(user):
    return user.groups.filter(name="student").exists()
