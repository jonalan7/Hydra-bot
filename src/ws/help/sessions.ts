export const sessionClient = class Session {
  static session = new Array();

  static replaceNameSession(nameSession: string) {
    return nameSession.replace(/[^0-9a-zA-Zs]/g, '');
  }
  // Use this function to add a new session!
  // nameSession = client name, example: test, job ... etc.
  static async newSession(nameSession: string) {
    // checks if the clinet name exists in the session
    nameSession = this.replaceNameSession(nameSession);
    const check = this.session.filter((e) => e.name === nameSession);
    if (!check.length) {
      // creating a new session!
      this.session.push({
        name: nameSession,
      });
      return true;
    }
    return false;
  }

  // check if there is a customer in the session!
  static async checkClient(nameSession: string) {
    nameSession = this.replaceNameSession(nameSession);
    if (nameSession) {
      // checks if the clinet name exists in the session
      const checkFilter = this.session.filter(
        (order) => order.name === nameSession
      );
      // if it exists it returns a boolean true!
      if (checkFilter.length) {
        return true;
      }
    }
    return false;
  }

  // add new objects to the session!
  static async addInfoSession(nameSession: string, exted: any) {
    nameSession = this.replaceNameSession(nameSession);
    // checking if the session name and object have been passed!
    if (!!nameSession && typeof exted === 'object') {
      // Using the function to check if the customer exists in the session!
      const check = await this.checkClient(nameSession);
      if (check) {
        // Scans all sessions to add a new object!
        for (let i = 0; i < this.session.length; i += 1) {
          if (this.session[i].name === nameSession) {
            Object.assign(this.session[i], exted);
            return true;
          }
        }
      }
    }
    return false;
  }

  // Get the client's index!
  static async getSessionId(nameSession: string) {
    nameSession = this.replaceNameSession(nameSession);
    if (nameSession) {
      const check = await this.checkClient(nameSession);
      if (check) {
        // Looks for the customer and returns the index!
        for (let i = 0; i < this.session.length; i += 1) {
          if (this.session[i].name === nameSession) {
            return i;
          }
        }
      }
    }
    return false;
  }

  // Checks whether an index exists on the client object
  static async checkObjectSession(
    nameSession: string,
    key: string,
    index: number
  ) {
    nameSession = this.replaceNameSession(nameSession);
    if (!!nameSession && !!key && Number.isInteger(index)) {
      const check = await this.checkClient(nameSession);
      if (check) {
        // Looking for the object, if it exists it returns a true!
        if (this.session[index] && this.session[index][key]) {
          return true;
        }
      }
    }
    return false;
  }

  // remove an object added to the client
  static async removeObjectsSession(
    nameSession: string,
    key: string,
    index: number
  ) {
    nameSession = this.replaceNameSession(nameSession);
    if (!!nameSession && !!key && !!index) {
      const check = await this.checkClient(nameSession);
      if (check) {
        if (this.session[index] && this.session[index][key]) {
          delete this.session[index][key];
          return true;
        }
      }
    }
    return false;
  }

  // Removing a client from the session!
  static async deleteSession(nameSession: string) {
    nameSession = this.replaceNameSession(nameSession);
    if (nameSession) {
      // Checking if the customer exists!
      const check = await this.checkClient(nameSession);
      if (check) {
        // If it exists, the client is deleted from the session!
        let key = await this.getSessionId(nameSession);
        if (typeof key === 'number') {
          this.session.splice(key, 1);
          return true;
        }
      }
    }
    return false;
  }

  // Returns all customer information!
  static async getUser(nameSession: string) {
    nameSession = this.replaceNameSession(nameSession);
    if (nameSession) {
      const check = await this.checkClient(nameSession);
      if (check) {
        let key = await this.getSessionId(nameSession);
        if (typeof key === 'number') {
          return this.session[key];
        }
      }
    }
    return false;
  }

  // Returns all sessions!
  static async getAllSessions() {
    return this.session;
  }
};
