const ServiceError = require('../core/serviceError');

const handleTeamDBError = (error) => {
  const { code = '', sqlMessage } = error;

  if (code === 'ER_DUP_ENTRY') {
    switch (true) {
      case sqlMessage.includes('idx_team_name_unique'):
        return ServiceError.validationFailed('A team with this name already exists');
      default:
        return ServiceError.validationFailed('This team already exists');
    }
  }

  if (code.startsWith('ER_NO_REFERENCED_ROW')) {
    switch (true) {
      case sqlMessage.includes('fk_team_user'):
        return ServiceError.notFound('The user does not exist');
      case sqlMessage.includes('fk_team_place'):
        return ServiceError.notFound('The place does not exist');
    }
  }

  return error;
};

module.exports = handleTeamDBError;