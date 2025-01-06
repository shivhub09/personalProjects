import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../models/PromoterDetailsModel.dart';
import '../../service/promoterService.dart';

class Profile extends StatefulWidget {
  final String promoterId;
  const Profile({required this.promoterId});

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  late Future<PromoterDetails> _promoterDetailsFuture;

  @override
  void initState() {
    super.initState();
    _promoterDetailsFuture =
        PromoterService.fetchPromoterDetails(widget.promoterId);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: FutureBuilder<PromoterDetails>(
        future: _promoterDetailsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(
                child: Text('Error: ${snapshot.error}',
                    style: GoogleFonts.poppins(color: Colors.white)));
          } else if (snapshot.hasData) {
            final promoterDetails = snapshot.data!;

            return SingleChildScrollView(
              child: Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    SizedBox(
                      height: MediaQuery.of(context).padding.top + 50,
                    ),
                    CircleAvatar(
                      radius: MediaQuery.of(context).size.width *
                          0.20, // Adjusted for better centering
                      backgroundColor: Colors.white,
                      child: Icon(
                        Icons.person,
                        size: MediaQuery.of(context).size.width *
                            0.20, // Adjusted for better centering
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(height: MediaQuery.of(context).size.height * 0.03),
                    Text(
                      promoterDetails.name,
                      style: GoogleFonts.poppins(
                        color: Colors.white,
                        fontSize: MediaQuery.of(context).size.width * 0.06,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: MediaQuery.of(context).size.height * 0.01),
                    Text(
                      promoterDetails.email,
                      style: GoogleFonts.poppins(
                        color: Colors.grey,
                        fontSize: MediaQuery.of(context).size.width * 0.04,
                      ),
                    ),
                    SizedBox(height: MediaQuery.of(context).size.height * 0.03),
                  ],
                ),
              ),
            );
          } else {
            return Center(
                child: Text('No promoter details available',
                    style: GoogleFonts.poppins(color: Colors.white)));
          }
        },
      ),
    );
  }
}
