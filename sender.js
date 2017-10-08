let crc = {
    e: {
        /* Sender Elements */
        crc_form: document.getElementById("crc_form"),
        sender_bits: document.getElementById("sender_bits"),
        sender_divisor: document.getElementById("sender_divisor"),
        sender_submit: document.getElementById("sender_submit"),
        sender_information: document.getElementById("sender_information"),

        /* Receiver Elements */
        receiver_information: document.getElementById("receiver_information"),
        receiver_submit: document.getElementById("receiver_submit"),
        information_from_sender: document.getElementById("information_from_sender"),

        /* Error Elements*/
        error_cont: document.getElementById("errors")
    },

    final_crc: null,
    bits_array: [],
    temp_array: [],
    divisor_array: [],
    divisor_length: 0
};


crc.evtCallbacks = {
    calculateSender: function(e)
    {
        e.preventDefault();

        /* Setting the bits array with the input values */
        this.bits_array = this.e.sender_bits.value.split("");

        /* Setting the divsor array with the input values */
        this.divisor_array = this.e.sender_divisor.value.split("");

        /* Setting the divisor length (Should never change) */
        this.divisor_length = this.divisor_array.length;

        /* For the length of the CRC Code - 1, Add that many 0's to the encoded message */
        let divisor_count = this.divisor_array.length - 1;
        for (let i = 0; i < divisor_count; i++) {
            this.bits_array.push("0");
        }

        /* Console Log the starting information */
        console.log("Sender Bits: " + this.e.sender_bits.value);
        console.log("Sender Divisor: " + this.e.sender_divisor.value);
        console.log("Bit Array with added 0's: " + this.bits_array);

        let starting_bits = document.createElement("h6");
        starting_bits.innerHTML = "Message With Prepended 0's: " + this.bits_array.join("");
        this.e.sender_information.appendChild(starting_bits);


        /* If both fields actually have input */
        if (this.e.sender_bits.value != "" && this.e.sender_divisor != "") {

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
            final_crc.innerHTML = "Final CRC: " + this.bits_array.join("") + "<br/><br/>" + "Sending to Receiver...";
            this.e.sender_information.appendChild(final_crc);

            /* Clear the form once its done */
            this.e.crc_form.reset();

        }
    },
};

crc.hasOtherNumbers = function(array) {
    for (let i = 0; i < array.length; i++)
    {
        if (i != 0 || i != 1) {
            return true;
        } else {
            return false;
        }
    }
};

crc.addListeners = function() {
        this.e.sender_submit.addEventListener("click", this.evtCallbacks.calculateSender.bind(this));
};


crc.init = function() {
    this.addListeners();
};

crc.init();
