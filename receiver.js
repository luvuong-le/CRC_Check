let receiver = {
    e: {
        /* Receiver Elements */
        receiver_information: document.getElementById("receiver_information"),
        receiver_submit: document.getElementById("receiver_submit"),
        information_from_sender: document.getElementById("information_from_sender")
    },

    crc_from_sender: null,
    original_message: null,
    original_divisor: null,
    final_crc: null,
    crc_array: [],
    bits_array: [],
    temp_array: [],
    divisor_array: [],
};

receiver.evtCallbacks = {
    calculateReceiver: function()
    {
        /* Append the CRC from sender onto the original message */
        this.crc_from_sender = this.getQueryParams("final_crc");
        this.original_message = this.getQueryParams("sender_bits");
        this.original_divisor = this.getQueryParams("sender_divisor");

        /* Set these to the corresponding arrays */

        /* Setting the bits array with the input values */
        this.bits_array = this.original_message.split("");

        /* Setting the divsor array with the input values */
        this.divisor_array = this.original_divisor.split("");

        this.crc_array = this.crc_from_sender.split("");

        /* The Appended message will have the crc, but if the CRC is only 3 characters append one to the beginning */
        if (this.crc_array.length <= 3) {
            this.crc_array.unshift("0");
        }

        /* Push the new crc to the bits array */
        for (let i = 0; i < this.crc_array.length; i++) {
            this.bits_array.push(this.crc_array[i]);
        }

        /* Console Log the starting information */
        console.log("Receiver Bits: " + this.original_message);
        console.log("Receiver Divisor: " + this.original_divisor);
        console.log("Bit Array with added 0's: " + this.bits_array);

        let receiver_bits = document.createElement("h6");
        receiver_bits.innerHTML = "Check Message With Prepended 0's: " + this.bits_array.join("");
        this.e.receiver_information.appendChild(receiver_bits);

        if (this.original_message != "" && this.original_divisor != "") {

            while (this.bits_array.length - 1 >= 4)
            {
                for (let i = 0; i < this.divisor_array.length; i++)
                {
                    if (this.bits_array[i] == this.divisor_array[i])
                    {
                        continue;
                    }

                    if ( this.bits_array[i] != this.divisor_array[i])
                    {
                        if (i == this.divisor_array.length - 1)
                        {
                            /* XOR the current one, and loop through the divisor */
                            this.temp_array.push(this.bits_array[i] ^ this.divisor_array[i]);

                            for (let current_index = i + 1; current_index < this.bits_array.length; current_index++) {
                                this.temp_array.push(this.bits_array[current_index]);
                            }

                            console.log(this.temp_array);


                            /* Empty the bits array then update it with new values closer to the CRC */
                            this.bits_array = [];
                            this.bits_array = this.temp_array.slice(0);


                            /* Empty the temp array for the next one */
                            this.temp_array = [];

                            break;
                        }
                        else
                        {
                            for (let current_index = i; current_index < this.divisor_array.length; current_index++)
                            {
                                this.temp_array.push(this.bits_array[current_index] ^ this.divisor_array[current_index]);
                            }

                            for (let current_index = this.divisor_array.length; current_index < this.bits_array.length; current_index++)
                            {
                                this.temp_array.push(this.bits_array[current_index]);
                            }

                            console.log(this.temp_array);

                            /* Empty the bits array then update it with new values closer to the CRC */
                            this.bits_array = [];
                            this.bits_array = this.temp_array.slice(0);


                            /* Empty the temp array for the next one */
                            this.temp_array = [];

                            break;
                        }

                    }
                }
            }
            console.log("CRC: " + this.bits_array);
            let final_crc = document.createElement("h6");
            final_crc.innerHTML = "Final CRC: " + this.bits_array.join("");
            this.e.receiver_information.appendChild(final_crc);
        }
    }
};

receiver.addListeners = function() {
    window.addEventListener("load", () => {
        /* Append all the information from the sender */
        let message_sent = document.createElement("h6");
        message_sent.innerHTML = "Message Sent from Sender: " + receiver.getQueryParams("sender_bits");
        this.e.information_from_sender.appendChild(message_sent);

        let divisor_sent = document.createElement("h6");
        divisor_sent.innerHTML = "Divisor Sent: " + receiver.getQueryParams("sender_divisor");
        this.e.information_from_sender.appendChild(divisor_sent);

        let final_crc_sent = document.createElement("h6");
        final_crc_sent.innerHTML = "Final Check Sent: " + receiver.getQueryParams("final_crc");
        this.e.information_from_sender.appendChild(final_crc_sent);
    });

    this.e.receiver_submit.addEventListener("click", this.evtCallbacks.calculateReceiver.bind(this));
};

receiver.getQueryParams = function(paramName) {
    let query = window.location.search.substring(1);
    let params = query.split("&");
    for (let i = 0; i < params.length; i++)
    {
        let parameter = params[i].split("=");
        if (parameter[0] == paramName) { return parameter[1]; }
    }
};

receiver.init = function() {
    this.addListeners();
};

receiver.init();
