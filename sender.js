let sender = {
    e: {
        /* Sender Elements */
        crc_form: document.getElementById("crc_form"),
        sender_bits: document.getElementById("sender_bits"),
        sender_divisor: document.getElementById("sender_divisor"),
        sender_submit: document.getElementById("sender_submit"),
        sender_information: document.getElementById("sender_information"),
        sender_crc: document.getElementById("crc_send"),

        /* Error Elements*/
        error_cont: document.getElementById("fields-empty")
    },

    final_crc: null,
    bits_array: [],
    temp_array: [],
    divisor_array: [],
};


sender.evtCallbacks = {
    calculateSender: function(e)
    {
        /* Prevent the form from sending */
        e.preventDefault();

        /* Setting the bits array with the input values */
        this.bits_array = this.e.sender_bits.value.split("");

        /* Setting the divsor array with the input values */
        this.divisor_array = this.e.sender_divisor.value.split("");

        /* For the length of the CRC Code - 1, Add that many 0's to the encoded message */
        for (let i = 0; i < this.divisor_array.length - 1; i++) {
            this.bits_array.push("0");
        }

        /* Console Log the starting information */
        console.log("Sender Bits: " + this.e.sender_bits.value);
        console.log("Sender Divisor: " + this.e.sender_divisor.value);
        console.log("Bit Array with added 0's: " + this.bits_array);


        /* If both fields actually have input */
        if (this.e.sender_bits.value != "" && this.e.sender_divisor.value != "" && !this.hasOtherNumbers(this.bits_array) && !this.hasOtherNumbers(this.divisor_array)) {

            /* Prevent the button from being clicked again */
            this.e.sender_submit.style.pointerEvents = "none";

            let starting_bits = document.createElement("h6");
            starting_bits.innerHTML = "Message With Prepended 0's: " + this.bits_array.join("");
            this.e.sender_information.appendChild(starting_bits);

            while (this.bits_array.length - 1 >= this.divisor_array.length - 1)
            {
                for (let i = 0; i < this.divisor_array.length; i++)
                {
                    if (this.bits_array[i] == this.divisor_array[i])
                    {
                        if (i == this.divisor_array.length - 1) {
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
                        } else {
                            continue;
                        }
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
            final_crc.innerHTML = "Final CRC: " + this.bits_array.join("") + "<br/><br/>" + "SENDING TO RECEIVER...";
            this.e.sender_information.appendChild(final_crc);

            this.e.sender_crc.value = this.bits_array.join("");

            /* Send form after finishing the calculation */
            setTimeout(function() {
                sender.e.crc_form.submit();
            }, 2500);

        } else {
            console.log("Error Occured");
            /* Generate Error Message Here */
            /* Scroll to Top */
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;

            if (sender.e.error_cont.style.display == "")
            {
                sender.e.error_cont.classList.add("visible");
            }

            setTimeout(function() {
                if (sender.e.error_cont.classList.contains("visible"))
                {
                    sender.e.error_cont.classList.remove("visible");
                    sender.e.error_cont.classList.add("hidden");
                }

                sender.e.crc_form.reset();
            }, 3000);
        }
    },
};

sender.hasOtherNumbers = function(array) {
    let error = 0;
    for (let i = 0; i < array.length; i++)
    {
        if (array[i] != "0" && array[i] != "1" || array[i] != 0 && array[i] != 1) {
            error++;
            break;
        } else {
            continue;
        }
    }
    if (error > 0) { return true; } else { return false; }
};

sender.addListeners = function() {
        this.e.sender_submit.addEventListener("click", this.evtCallbacks.calculateSender.bind(this));
};


sender.init = function() {
    this.addListeners();
    this.e.error_cont.classList.add("hidden");
};

sender.init();
